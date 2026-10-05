/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ResidentDashboard } from './pages/ResidentDashboard';
import { ManagementDashboard } from './pages/ManagementDashboard';
import { UserRole } from './types';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<string>('landing');

  // Handle navigation requests
  const handleNavigate = (view: string) => {
    // If user clicks rooms, mess, facts, or contact from navbar, we can scroll or navigate
    if (view === 'rooms') {
      setCurrentView('landing');
      setTimeout(() => {
        document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (view === 'mess') {
      setCurrentView('landing');
      setTimeout(() => {
        document.getElementById('mess-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (view === 'contact' || view === 'facts') {
      setCurrentView('landing');
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called after successful authentication
  const handleLoginSuccess = (role: UserRole) => {
    if (role === 'resident') {
      setCurrentView('resident-dashboard');
    } else {
      setCurrentView('management-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col text-[#171717]">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}

        {currentView === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            onSuccessRedirect={handleLoginSuccess}
          />
        )}

        {currentView === 'resident-dashboard' && (
          <ResidentDashboard onNavigate={handleNavigate} />
        )}

        {currentView === 'management-dashboard' && (
          <ManagementDashboard onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MaintenanceProvider>
        <AppContent />
      </MaintenanceProvider>
    </AuthProvider>
  );
}
