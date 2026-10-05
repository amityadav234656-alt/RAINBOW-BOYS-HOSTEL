import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#E7E4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-[#6D0808]"
        >
          <div className="w-8 h-8 rounded-md bg-[#6D0808] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm transition-transform group-hover:scale-105">
            R1
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#171717] group-hover:text-[#6D0808] transition-colors leading-none">
              RAINBOW ONE
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-medium mt-0.5">
              Rainbow Boys Hostel
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B6B6B]">
          <button
            onClick={() => onNavigate('landing')}
            className={`transition-colors cursor-pointer hover:text-[#171717] ${
              currentView === 'landing' ? 'text-[#6D0808] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('rooms')}
            className={`transition-colors cursor-pointer hover:text-[#171717] ${
              currentView === 'rooms' ? 'text-[#6D0808] font-semibold' : ''
            }`}
          >
            Rooms
          </button>
          <button
            onClick={() => onNavigate('mess')}
            className={`transition-colors cursor-pointer hover:text-[#171717] ${
              currentView === 'mess' ? 'text-[#6D0808] font-semibold' : ''
            }`}
          >
            Mess Menu
          </button>
          <button
            onClick={() => onNavigate('facts')}
            className={`transition-colors cursor-pointer hover:text-[#171717] ${
              currentView === 'facts' ? 'text-[#6D0808] font-semibold' : ''
            }`}
          >
            Hostel Info
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors cursor-pointer hover:text-[#171717] ${
              currentView === 'contact' ? 'text-[#6D0808] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate(user.role === 'resident' ? 'resident-dashboard' : 'management-dashboard')}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#6D0808] hover:bg-[#540505] rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {user.role === 'resident' ? 'My Dashboard' : 'Management Desk'}
                </span>
                <span className="sm:hidden">Dashboard</span>
              </button>
              <button
                onClick={() => {
                  logout();
                  onNavigate('landing');
                }}
                title="Sign Out"
                className="p-1.5 text-[#6B6B6B] hover:text-[#171717] hover:bg-[#E7E4E0]/50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm ${
                currentView === 'login'
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#6D0808] hover:bg-[#540505] text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Resident Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
