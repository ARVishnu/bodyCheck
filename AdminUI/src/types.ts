export type AdminAuth = {
  email: string
  password: string
}

export type UserRow = {
  id: number
  full_name: string
  email: string
  created_at: string
  status: string
}

export type LoginEventRow = {
  id: number
  user_id: number | null
  user_email: string
  login_at: string
  success: boolean
  ip_address: string | null
  user_agent: string | null
}

export type ContactFormRow = {
  id: number
  email: string
  name?: string | null
  full_name?: string | null
  role?: string | null
  organization?: string | null
  subject?: string | null
  message?: string | null
  content?: string | null
  created_at?: string | null
  submitted_at?: string | null
}

export type AdminData = {
  users: UserRow[]
  login_events: LoginEventRow[]
  stats: {
    total_users: number
    total_events: number
    active_users: number
    pending_users: number
  }
}


