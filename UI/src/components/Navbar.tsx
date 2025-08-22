import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  User,
  LogOut,
  Shield,
  Stethoscope,
  UserCog,
  ChevronDown,
} from "lucide-react";
import { bodyCheckLogoDark } from "../assets/images";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);

  // Refs for dropdown containers
  const homeDropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside dropdowns (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If mobile menu is open, skip outside-close behavior for dropdowns
      if (isMenuOpen) return;
      if (
        homeDropdownRef.current &&
        !homeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsHomeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleHomeDropdownToggle = () => {
    setIsHomeDropdownOpen(!isHomeDropdownOpen);
  };


  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />;
      case "provider":
        return <Stethoscope className="w-4 h-4" />;
      case "nurse":
        return <UserCog className="w-4 h-4" />;
      case "user":
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const publicLinks = [
    { to: "/demo-dashboard", label: "Demo Dashboard" },
    // { to: '/documentation', label: 'Documentation' },
    { to: "/contact", label: "Contact" },
  ];

  // Build secure links per role
  let secureLinks = [
    { to: "/dashboard", label: "Dashboard" },
    // { to: "/ai-pipeline", label: "AI Pipeline" },
    // { to: '/documentation', label: 'Documentation' },
  ];

  if (user?.role === "admin") {
    secureLinks.splice(1, 0, { to: "/upload", label: "Upload Scans" });
  }

  if (user?.role === "user") {
    // Basic users should see Demo Dashboard instead of Dashboard
    secureLinks = [
      { to: "/sample-report", label: "Sample Report" },
      { to: "/demo-dashboard", label: "Demo Dashboard" },
      { to: "/contact", label: "Contact" },
    ];
  }

  const currentLinks = isAuthenticated ? secureLinks : publicLinks;
  const isProd =
    typeof window !== "undefined" &&
    window.location.hostname === "bodycheck.ai";
  const homeDropdownItems = [
    ...(isProd
      ? [
          { to: "/", label: "Home" },
          // { to: "/researchersV3", label: "Researchers" },
          // { to: "/patientsV2", label: "Patients" },
          // { to: "/providers", label: "Providers" },
        ]
      : [
          { to: "/", label: "Home" },
          { to: "/researchersV3", label: "Researchers" },
          // { to: '/researchersV2', label: 'Researchers V2' },
          // { to: '/researchersV3', label: 'Researchers V3' },
          { to: "/patients", label: "Patients" },
          { to: "/providers", label: "Providers" },
        ]),
  ];

  return (
    <nav className="bg-white shadow-sm  sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-bright-turquoise font-bold text-xl"
          >
            <img
              style={{ width: "250px" }}
              src={bodyCheckLogoDark}
              alt="BodyCheck Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Dropdown */}
            {homeDropdownItems.length > 1 ? (
              <div className="relative" ref={homeDropdownRef}>
                <button
                  onClick={handleHomeDropdownToggle}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-turquoise ${
                    homeDropdownItems.some(
                      (item) => location.pathname === item.to
                    )
                      ? "text-turquoise border-b-2 border-turquoise pb-1"
                      : "text-cloud-burst"
                  }`}
                >
                  <span>Home</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isHomeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isHomeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    {homeDropdownItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          location.pathname === item.to
                            ? "text-turquoise bg-gray-50"
                            : "text-cloud-burst"
                        }`}
                        onClick={() => setIsHomeDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              homeDropdownItems.length === 1 && (
                <Link
                  to={homeDropdownItems[0].to}
                  className={`text-sm font-medium transition-colors hover:text-turquoise ${
                    location.pathname === homeDropdownItems[0].to
                      ? "text-turquoise border-b-2 border-turquoise pb-1"
                      : "text-cloud-burst"
                  }`}
                >
                  {homeDropdownItems[0].label}
                </Link>
              )
            )}

            {/* Regular Links */}
            {currentLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-turquoise ${
                  location.pathname === link.to
                    ? "text-turquoise border-b-2 border-turquoise pb-1"
                    : "text-cloud-burst"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://bodycheck.ai/admin/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium transition-colors hover:text-turquoise text-cloud-burst"
            >
              Admin
            </a>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-bright-turquoise">
                  {getRoleIcon(user.role)}
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-bright-turquoise hover:text-turquoise transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login?screen=login"
                  className="text-sm font-medium text-cloud-burst hover:text-turquoise transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/login?screen=signup"
                  className="bg-turquoise text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-bright-turquoise transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {/* Mobile Home Dropdown */}
              <div>
                <button
                  onClick={handleHomeDropdownToggle}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Home</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isHomeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isHomeDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {homeDropdownItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsHomeDropdownOpen(false);
                        }}
                        className={`block text-sm transition-colors hover:text-blue-600 ${
                          location.pathname === item.to
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Regular Mobile Links */}
              {currentLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location.pathname === link.to
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/admin/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-gray-700"
              >
                Admin
              </a>

              {isAuthenticated && user ? (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    {getRoleIcon(user.role)}
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-200 flex flex-col space-y-2">
                  <Link
                    to="/login?screen=login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login?screen=signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
