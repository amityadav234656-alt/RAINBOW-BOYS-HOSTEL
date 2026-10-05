import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DEMO_USERS, HOSTEL_FACTS } from '../data/mockData';
import { UserRole } from '../types';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, Phone, Info } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (view: string) => void;
  onSuccessRedirect?: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onSuccessRedirect }) => {
  const { login, isLoading } = useAuth();

  // Active role selector for rapid testing
  const [selectedRole, setSelectedRole] = useState<UserRole>('resident');
  const [identifier, setIdentifier] = useState('rahul@rainbowboyshostel.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDevNote, setShowDevNote] = useState(false);

  // When clicking a demo role tab, prefill with exact verified demo credentials
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    const demo = DEMO_USERS.find((u) => u.role === role);
    if (demo) {
      setIdentifier(demo.email);
      setPassword('password123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('Please enter your registered mobile number or email.');
      return;
    }

    try {
      const success = await login(identifier, password, selectedRole);
      if (success) {
        if (onSuccessRedirect) {
          onSuccessRedirect(selectedRole);
        } else {
          onNavigate(selectedRole === 'resident' ? 'resident-dashboard' : 'management-dashboard');
        }
      }
    } catch {
      setErrorMessage('Invalid credentials. Please verify your details or contact the warden office.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2.5 mx-auto focus-visible:outline-[#6D0808] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-[#6D0808] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm">
              R1
            </div>
            <div className="text-left">
              <span className="text-lg font-bold tracking-tight text-[#171717] block leading-none">
                RAINBOW ONE
              </span>
              <span className="text-[11px] tracking-wide text-[#6B6B6B] font-medium block mt-1">
                Rainbow Boys Hostel
              </span>
            </div>
          </button>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#171717]">
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Official digital platform for residents and management
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-8 bg-white py-8 px-6 sm:px-8 border border-[#E7E4E0] rounded-xl shadow-xs">
          {/* Quick Demo Role Selector (Essential for testing without roadblocks) */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#171717] mb-2 tracking-wide uppercase">
              Select Profile Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F3EFEA] rounded-lg border border-[#E7E4E0]">
              <button
                type="button"
                onClick={() => handleRoleSelect('resident')}
                className={`py-2 px-2 text-xs font-medium rounded-md transition-all text-center cursor-pointer ${
                  selectedRole === 'resident'
                    ? 'bg-white text-[#6D0808] font-semibold shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                Resident
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('warden')}
                className={`py-2 px-2 text-xs font-medium rounded-md transition-all text-center cursor-pointer ${
                  selectedRole === 'warden'
                    ? 'bg-white text-[#6D0808] font-semibold shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                Warden
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-2 px-2 text-xs font-medium rounded-md transition-all text-center cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-white text-[#6D0808] font-semibold shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                Owner / Admin
              </button>
            </div>
            {/* Context Badge for current role */}
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#6B6B6B]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
              {selectedRole === 'resident' && (
                <span>Demo: <strong>Rahul Sharma</strong> (Room 204, Bed A)</span>
              )}
              {selectedRole === 'warden' && (
                <span>Demo: <strong>Suresh Kumar</strong> (Hostel Warden Desk)</span>
              )}
              {selectedRole === 'admin' && (
                <span>Demo: <strong>Amit Yadav</strong> (Hostel Owner / Superadmin)</span>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-medium text-[#171717] mb-1.5"
              >
                Mobile Number or Email
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6B6B]">
                  {identifier.includes('@') ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <Phone className="h-4 w-4" />
                  )}
                </div>
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 9876543210 or rahul@rainbowboyshostel.com"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E7E4E0] rounded-lg text-[#171717] placeholder-[#6B6B6B]/60 focus:outline-none focus:border-[#6D0808] focus:ring-1 focus:ring-[#6D0808] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#171717]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert(`Password recovery: Please contact the Warden Office (${HOSTEL_FACTS.contact.phone}) to reset your password.`)}
                  className="text-xs text-[#6D0808] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6B6B]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-[#E7E4E0] rounded-lg text-[#171717] placeholder-[#6B6B6B]/60 focus:outline-none focus:border-[#6D0808] focus:ring-1 focus:ring-[#6D0808] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6B6B] hover:text-[#171717] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E7E4E0] text-[#6D0808] focus:ring-[#6D0808]"
                />
                <span className="text-xs text-[#6B6B6B]">Remember this device</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-[#6B6B6B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Protected</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#6D0808] hover:bg-[#540505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6D0808] shadow-sm transition-colors cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as {selectedRole === 'resident' ? 'Resident' : selectedRole === 'warden' ? 'Warden' : 'Admin'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Guidance */}
          <div className="mt-6 pt-5 border-t border-[#E7E4E0] text-center">
            <p className="text-xs text-[#6B6B6B]">
              New resident admission?{' '}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="font-medium text-[#6D0808] hover:underline cursor-pointer"
              >
                Contact the hostel office
              </button>
            </p>
          </div>
        </div>

        {/* Developer Notes for CSE Student */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowDevNote(!showDevNote)}
            className="inline-flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#171717] cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Developer Note for BTech CSE: How Role Routing Works</span>
          </button>

          {showDevNote && (
            <div className="mt-3 p-4 bg-white border border-[#E7E4E0] rounded-xl text-left text-xs text-[#6B6B6B] space-y-2 shadow-xs">
              <p className="font-semibold text-[#171717]">How this Authentication System Operates:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Resident Login:</strong> Enforces data isolation. A resident (e.g. Rahul Sharma) only receives access to their personal room (Room 204), bed, and payment ledger.
                </li>
                <li>
                  <strong>Warden / Manager Login:</strong> Gains administrative tools for room allocation, mess menu updates, and complaint tracking.
                </li>
                <li>
                  <strong>Admin / Owner Login:</strong> Full oversight across all 33 rooms, 66 beds, revenue summaries, and system settings.
                </li>
                <li>
                  <strong>Production Upgrade:</strong> In Phase 4, this maps 1:1 to Supabase/PostgreSQL Authentication with Row-Level Security (RLS) policies.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
