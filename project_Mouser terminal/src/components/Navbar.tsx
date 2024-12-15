import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, LogOut } from 'lucide-react';
import { useAuth } from '../stores/authStore';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-cyber-blue border-b border-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold">MOUSER_TERMINAL</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link to="/auth" className="cyber-button">
                ACCESS_TERMINAL
              </Link>
            ) : (
              <>
                <Link to="/dashboard" className="cyber-button">
                  DASHBOARD
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 cyber-button"
                >
                  <LogOut size={16} />
                  <span>EXIT</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;