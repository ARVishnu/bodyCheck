import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Menu, X, User, LogOut, Shield, Stethoscope, UserCog } from 'lucide-react';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'physician': return <Stethoscope className="w-4 h-4" />;
      case 'nurse': return <UserCog className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/demo-dashboard', label: 'Demo Dashboard' },
    { to: '/sample-report', label: 'Sample Report' },
    // { to: '/ai-pipeline', label: 'AI Pipeline' },
    { to: '/documentation', label: 'Documentation' },
    { to: '/contact', label: 'Contact' },
  ];

  const secureLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/ai-pipeline', label: 'AI Pipeline' },
    { to: '/documentation', label: 'Documentation' },
  ];

  if (user?.role === 'admin') {
    secureLinks.splice(1, 0, { to: '/upload', label: 'Upload Scans' });
  }

  const currentLinks = isAuthenticated ? secureLinks : publicLinks;

  return (
    <nav className="bg-white shadow-sm  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-bright-turquoise font-bold text-xl">
           <img style={{width:'250px'}} src="/Images/BodyCheck_Dark.svg" alt="BodyCheck Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-turquoise ${
                  location.pathname === link.to
                    ? 'text-turquoise border-b-2 border-turquoise pb-1'
                    : 'text-cloud-burst'
                }`}
              >
                {link.label}
              </Link>
            ))}
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
                  to="/login"
                  className="text-sm font-medium text-cloud-burst hover:text-turquoise transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/login"
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
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {currentLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location.pathname === link.to ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
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
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
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