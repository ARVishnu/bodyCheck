import os
import json
import logging
import secrets
import smtplib
from email.message import EmailMessage
from datetime import datetime, timedelta
import sqlite3

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from passlib.hash import bcrypt

# ---------- logging ----------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------- FastAPI + CORS ----------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
SQLite storage for user accounts
Table: users
  - id INTEGER PRIMARY KEY AUTOINCREMENT
  - full_name TEXT NOT NULL
  - email TEXT NOT NULL UNIQUE
  - password_hash TEXT NOT NULL
  - created_at TEXT NOT NULL (ISO timestamp UTC)
  - status TEXT NOT NULL ('pending' | 'active')
  - otp_code TEXT NULL
  - otp_expiry TEXT NULL (ISO timestamp UTC)
"""

DB_PATH = os.environ.get("SQLITE_DB_PATH")
if not DB_PATH:
    DB_PATH = os.path.join(os.path.dirname(__file__), "logins.db")

conn = sqlite3.connect(DB_PATH, check_same_thread=False)
conn.row_factory = sqlite3.Row

def init_db():
    try:
        with conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    full_name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    status TEXT NOT NULL,
                    otp_code TEXT,
                    otp_expiry TEXT
                )
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS login_events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    user_email TEXT NOT NULL,
                    login_at TEXT NOT NULL,
                    success INTEGER NOT NULL,
                    ip_address TEXT,
                    user_agent TEXT,
                    FOREIGN KEY(user_id) REFERENCES users(id)
                )
                """
            )
        logger.info(f"SQLite initialized at {DB_PATH}")
    except Exception as e:
        logger.error(f"Failed to initialize SQLite DB: {e}")

def get_user_by_email(email: str):
    cur = conn.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cur.fetchone()
    return dict(row) if row else None

def create_user_pending(full_name: str, email: str, password_hash: str, otp_code: str, otp_expiry: str):
    created_at = datetime.utcnow().isoformat()
    with conn:
        conn.execute(
            """
            INSERT INTO users (full_name, email, password_hash, created_at, status, otp_code, otp_expiry)
            VALUES (?, ?, ?, ?, 'pending', ?, ?)
            """,
            (full_name, email, password_hash, created_at, otp_code, otp_expiry),
        )

def set_user_status(email: str, status: str):
    with conn:
        conn.execute("UPDATE users SET status = ? WHERE email = ?", (status, email))

def set_user_otp(email: str, otp_code: str, otp_expiry: str):
    with conn:
        conn.execute("UPDATE users SET otp_code = ?, otp_expiry = ? WHERE email = ?", (otp_code, otp_expiry, email))

def clear_user_otp(email: str):
    with conn:
        conn.execute("UPDATE users SET otp_code = NULL, otp_expiry = NULL WHERE email = ?", (email,))

def update_user_password(email: str, new_password_hash: str):
    with conn:
        conn.execute("UPDATE users SET password_hash = ? WHERE email = ?", (new_password_hash, email))

# ---------- Login event logging ----------
def log_login_event(user_id: int | None, user_email: str, success: bool, ip_address: str | None, user_agent: str | None):
    with conn:
        conn.execute(
            """
            INSERT INTO login_events (user_id, user_email, login_at, success, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                user_id,
                user_email,
                datetime.utcnow().isoformat(),
                1 if success else 0,
                ip_address,
                user_agent,
            ),
        )

# Initialize database on startup
init_db()

# ---------- Email (SMTP) utility ----------
try:
    from config import SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, OTP_TTL_MINUTES
except ImportError:
    # Fallback to environment variables if config.py doesn't exist
    SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
    SMTP_USER = os.environ.get("SMTP_USER")
    SMTP_PASS = os.environ.get("SMTP_PASS")
    OTP_TTL_MINUTES = int(os.environ.get("OTP_TTL_MINUTES", 15))

def send_otp_email(recipient_email: str, otp_code: str, purpose: str = "verification"):
    if not SMTP_USER or not SMTP_PASS:
        logger.warning("SMTP credentials not set; skipping sending email (development mode)")
        return False, "SMTP not configured"
    try:
        msg = EmailMessage()
        
        if purpose == "signup":
            msg["Subject"] = "Verify your BodyCheck account"
            content = f"""Welcome to BodyCheck!

Your verification code is: {otp_code}

This code will expire in {OTP_TTL_MINUTES} minutes.

Please enter this code to complete your account registration.

Best regards,
BodyCheck Team"""
        else:
            msg["Subject"] = "Reset your BodyCheck password"
            content = f"""Password Reset Request

Your OTP code is: {otp_code}

This code will expire in {OTP_TTL_MINUTES} minutes.

If you didn't request this password reset, please ignore this email.

Best regards,
BodyCheck Team"""
        
        msg["From"] = SMTP_USER
        msg["To"] = recipient_email
        msg.set_content(content)

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
            smtp.starttls()
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.send_message(msg)
        logger.info(f"Sent {purpose} OTP email to {recipient_email}")
        return True, None
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False, str(e)

# ---------- Pydantic models ----------
class SignupData(BaseModel):
    full_name: str
    email: str
    password: str

class SignupVerifyData(BaseModel):
    email: str
    otp: str

class LoginData(BaseModel):
    email: str
    password: str

class ForgotRequest(BaseModel):
    email: str

class ResetRequest(BaseModel):
    email: str
    otp: str
    new_password: str

# ---------- Admin utilities and endpoints ----------
def _get_admin_emails():
    raw = os.environ.get("ADMIN_EMAILS", "")
    return {e.strip().lower() for e in raw.split(",") if e.strip()}

def _require_admin_from_headers(request: Request):
    admin_email = request.headers.get("X-Admin-Email")
    admin_password = request.headers.get("X-Admin-Password")
    # hardcoded admin for testing
    if admin_email == "vishnu@example.com" and admin_password == "123":
        return {"email": admin_email, "status": "active"}
    if not admin_email or not admin_password:
        raise HTTPException(status_code=401, detail="Missing admin credentials")
    admin_email_lc = admin_email.strip().lower()
    allowed = _get_admin_emails()
    if allowed and admin_email_lc not in allowed:
        raise HTTPException(status_code=403, detail="Not an admin account")
    user = get_user_by_email(admin_email_lc)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    if user.get("status") != "active":
        raise HTTPException(status_code=403, detail="Admin account not active")
    stored_pw = user.get("password_hash") or ""
    if not bcrypt.verify(admin_password, stored_pw):
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    return user

def _list_users(limit: int | None = None):
    query = "SELECT id, full_name, email, created_at, status FROM users ORDER BY datetime(created_at) DESC"
    if limit is not None:
        cur = conn.execute(query + " LIMIT ?", (int(limit),))
    else:
        cur = conn.execute(query)
    return [dict(r) for r in cur.fetchall()]

def _list_login_events(limit: int | None = None):
    query = (
        "SELECT id, user_id, user_email, login_at, success, ip_address, user_agent "
        "FROM login_events ORDER BY datetime(login_at) DESC"
    )
    if limit is not None:
        cur = conn.execute(query + " LIMIT ?", (int(limit),))
    else:
        cur = conn.execute(query)
    rows = [dict(r) for r in cur.fetchall()]
    for r in rows:
        r["success"] = bool(r.get("success"))
    return rows

@app.get("/admin/data")
async def admin_all_data(request: Request, users_limit: int | None = None, events_limit: int | None = None):
    _require_admin_from_headers(request)
    users = _list_users(users_limit)
    events = _list_login_events(events_limit)
    totals = _list_users()
    total_events = _list_login_events()
    stats = {
        "total_users": len(totals),
        "total_events": len(total_events),
        "active_users": sum(1 for u in totals if u.get("status") == "active"),
        "pending_users": sum(1 for u in totals if u.get("status") == "pending"),
    }
    return {"users": users, "login_events": events, "stats": stats}

# ---------- Signup with OTP verification ----------
@app.post("/signup")
async def signup(data: SignupData):
    try:
        existing = get_user_by_email(data.email)
        # if existing:
        #     raise HTTPException(status_code=400, detail="Email already registered")
        
        # generate 6-digit OTP
        otp_code = f"{secrets.randbelow(10**6):06d}"
        expiry = (datetime.utcnow() + timedelta(minutes=OTP_TTL_MINUTES)).isoformat()
        
        # store signup data temporarily with OTP
        password_hash = bcrypt.hash(data.password)
        try:
            create_user_pending(data.full_name, data.email, password_hash, otp_code, expiry)
        except sqlite3.IntegrityError:
            raise HTTPException(status_code=400, detail="Email already registered")
        logger.info(f"Signup initiated for: {data.email}")
        
        # send OTP email
        sent, err = send_otp_email(data.email, otp_code, "signup")
        if not sent:
            logger.error(f"Failed to send signup OTP email: {err}")
            return {"message": "Signup initiated. Please check your email for OTP verification."}
        
        return {"message": "Signup initiated. Please check your email for OTP verification."}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save data: {e}")

@app.post("/signup-verify")
async def signup_verify(data: SignupVerifyData):
    try:
        user = get_user_by_email(data.email)
        if not user:
            raise HTTPException(status_code=404, detail="Signup request not found")
        status = user.get("status", "")
        if status != "pending":
            raise HTTPException(status_code=400, detail="Invalid signup status")
        
        otp_stored = user.get("otp_code", "")
        otp_expiry = user.get("otp_expiry", "")
        
        if not otp_stored:
            raise HTTPException(status_code=400, detail="No OTP found for this signup")
        
        # check expiry
        try:
            # Handle different datetime formats
            if otp_expiry:
                try:
                    expiry_dt = datetime.fromisoformat(otp_expiry)
                except ValueError:
                    try:
                        # Try parsing as regular datetime string
                        expiry_dt = datetime.strptime(otp_expiry, "%Y-%m-%d %H:%M:%S")
                    except ValueError:
                        # Try parsing without microseconds
                        expiry_dt = datetime.strptime(otp_expiry.split('.')[0], "%Y-%m-%dT%H:%M:%S")
            else:
                raise HTTPException(status_code=400, detail="OTP expired")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid OTP expiry format")
        
        if datetime.utcnow() > expiry_dt:
            raise HTTPException(status_code=400, detail="OTP expired")
        
        # verify OTP
        if str(otp_stored) != str(data.otp):
            raise HTTPException(status_code=401, detail="Invalid OTP")
        
        # activate account
        set_user_status(data.email, "active")
        clear_user_otp(data.email)
        
        logger.info(f"Signup verified successfully for: {data.email}")
        return {"message": "Signup verified successfully! You can now login."}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Signup verify error: {e}")
        raise HTTPException(status_code=500, detail=f"Verification failed: {e}")

# ---------- Login (updated to check for active status) ----------
@app.post("/login")
async def login(data: LoginData, request: Request):
    logger.info(f"Login attempt for: {data.email}")
    try:
        user = get_user_by_email(data.email)
        if not user:
            logger.warning(f"User not found: {data.email}")
            # record failed attempt
            ip = request.client.host if request and request.client else None
            ua = request.headers.get("user-agent") if request else None
            log_login_event(None, data.email, False, ip, ua)
            raise HTTPException(status_code=404, detail="User not found")
        
        status = user.get("status", "")
        
        # check if account is active
        if status == "pending":
            ip = request.client.host if request and request.client else None
            ua = request.headers.get("user-agent") if request else None
            log_login_event(user.get("id"), data.email, False, ip, ua)
            raise HTTPException(status_code=401, detail="Account not verified. Please check your email for OTP.")
        
        stored_pw = user.get("password_hash") or ""
        ip = request.client.host if request and request.client else None
        ua = request.headers.get("user-agent") if request else None
        if bcrypt.verify(data.password, stored_pw):
            logger.info(f"Login success for {data.email}")
            log_login_event(user.get("id"), data.email, True, ip, ua)
            return {"message": "Login successful", "full_name": user.get("full_name")}
        else:
            logger.warning(f"Invalid password for {data.email}")
            log_login_event(user.get("id"), data.email, False, ip, ua)
            raise HTTPException(status_code=401, detail="Invalid password")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {e}")

# ---------- Forgot password (send OTP) ----------

@app.post("/forgot-password")
async def forgot_password(req: ForgotRequest):
    try:
        user = get_user_by_email(req.email)
        if not user:
            logger.warning(f"Forgot password requested for unknown email: {req.email}")
            # for security, don't reveal whether email exists; still return success
            return {"message": "If that email exists, an OTP has been sent"}
        # generate 6-digit OTP
        otp_code = f"{secrets.randbelow(10**6):06d}"
        expiry = (datetime.utcnow() + timedelta(minutes=OTP_TTL_MINUTES)).isoformat()
        # update user with OTP
        set_user_otp(req.email, otp_code, expiry)
        # send email (best-effort)
        sent, err = send_otp_email(req.email, otp_code)
        if not sent:
            logger.error(f"Failed to send OTP email: {err}")
            # still return generic message
            return {"message": "If that email exists, an OTP has been stored (email failed)"}
        return {"message": "If that email exists, an OTP has been sent"}
    except Exception as e:
        logger.error(f"forgot-password error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process request: {e}")

# ---------- Reset password using OTP ----------
@app.post("/reset-password")
async def reset_password(req: ResetRequest):
    try:
        user = get_user_by_email(req.email)
        if not user:
            logger.warning(f"Reset attempt for unknown email: {req.email}")
            raise HTTPException(status_code=404, detail="User not found")
        otp_stored = user.get("otp_code", "")
        otp_expiry = user.get("otp_expiry", "")
        if not otp_stored:
            raise HTTPException(status_code=400, detail="No OTP requested for this account")
        # compare expiry
        try:
            # Handle different datetime formats
            if otp_expiry:
                try:
                    expiry_dt = datetime.fromisoformat(otp_expiry)
                except ValueError:
                    try:
                        # Try parsing as regular datetime string
                        expiry_dt = datetime.strptime(otp_expiry, "%Y-%m-%d %H:%M:%S")
                    except ValueError:
                        # Try parsing without microseconds
                        expiry_dt = datetime.strptime(otp_expiry.split('.')[0], "%Y-%m-%dT%H:%M:%S")
            else:
                raise HTTPException(status_code=400, detail="OTP expired")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid OTP expiry format on server")
        if datetime.utcnow() > expiry_dt:
            raise HTTPException(status_code=400, detail="OTP expired")
        if str(otp_stored) != str(req.otp):
            raise HTTPException(status_code=401, detail="Invalid OTP")
        # all good -> update password (hash)
        new_hash = bcrypt.hash(req.new_password)
        update_user_password(req.email, new_hash)
        # clear OTP fields
        clear_user_otp(req.email)
        logger.info(f"Password reset successful for: {req.email}")
        return {"message": "Password reset successful"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"reset-password error: {e}")
        raise HTTPException(status_code=500, detail=f"Reset failed: {e}")

# ---------- Health check ----------
@app.get("/health")
async def health_check():
    try:
        # Simple DB query to confirm connectivity
        cur = conn.execute("SELECT COUNT(*) as c FROM users")
        count = cur.fetchone()[0]
        return {"status": "healthy", "db_path": DB_PATH, "user_count": count}
    except Exception as e:
        return {"status": "error", "message": str(e)}


