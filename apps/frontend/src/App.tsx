import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Dashboard } from '@/components/Dashboard';
import { EventDetail } from '@/components/EventDetail';
import { BantalanSettings } from '@/components/BantalanSettings';
import { IdCardDesigner } from '@/components/IdCardDesigner';
import { ParticipantDetails } from '@/components/ParticipantDetails';
import { ScoringQualification } from '@/components/ScoringQualification';
import { ScoringEliminasi } from '@/components/ScoringEliminasi';
import { CertificatePage } from '@/components/CertificatePage';
import { DocumentsPage } from '@/components/DocumentsPage';
import { LoginPage } from '@/components/LoginPage';
import { DOSPage } from '@/components/DOSPage';
import { CreateEventPage } from '@/components/CreateEventPage';
import { LiveScorePage } from '@/components/LiveScorePage';
import { Toaster } from '@/components/ui/toaster';

type CurrentPage = 'login' | 'dashboard' | 'event-detail' | 'bantalan-settings' | 'id-card-designer' | 'participant-details' | 'scoring-qualification' | 'scoring-eliminasi' | 'certificate' | 'documents' | 'dos' | 'create-event' | 'live-score';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard');

  // Check if we're on the DOS route (public access)
  const isDOSRoute = window.location.pathname === '/dos';
  
  // Check if we're on the Live Score route (public access)
  const isLiveScoreRoute = window.location.pathname === '/live-score';

  // Show DOS page if on DOS route (no login required)
  if (isDOSRoute) {
    return (
      <>
        <DOSPage />
        <Toaster />
      </>
    );
  }

  // Show Live Score page if on live score route (no login required)
  if (isLiveScoreRoute) {
    return (
      <>
        <LiveScorePage />
        <Toaster />
      </>
    );
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <Toaster />
      </>
    );
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleNavigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleScoringNavigation = (page: string) => {
    switch (page) {
      case 'scoring-kualifikasi':
        setCurrentPage('scoring-qualification');
        break;
      case 'scoring-eliminasi':
        setCurrentPage('scoring-eliminasi');
        break;
      case 'dokumen':
        setCurrentPage('documents');
        break;
      default:
        break;
    }
  };

  // Handle page navigation
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'create-event':
        return (
          <CreateEventPage 
            onBack={() => setCurrentPage('dashboard')}
            onLogout={handleLogout}
            onDashboard={handleNavigateToDashboard}
          />
        );
      case 'documents':
        return (
          <DocumentsPage 
            onBack={() => setCurrentPage('event-detail')}
            onNavigate={handleScoringNavigation}
            onLogout={handleLogout}
            onDashboard={handleNavigateToDashboard}
          />
        );
      case 'certificate':
        return (
          <CertificatePage 
            onBack={() => setCurrentPage('event-detail')}
            onLogout={handleLogout}
            onDashboard={handleNavigateToDashboard}
          />
        );
      case 'scoring-eliminasi':
        return (
          <ScoringEliminasi 
            onBack={() => setCurrentPage('event-detail')}
            onNavigate={handleScoringNavigation}
            onLogout={handleLogout}
            onDashboard={handleNavigateToDashboard}
          />
        );
      case 'scoring-qualification':
        return (
          <ScoringQualification 
            onBack={() => setCurrentPage('event-detail')}
            onNavigate={handleScoringNavigation}
            onLogout={handleLogout}
            onDashboard={handleNavigateToDashboard}
          />
        );
      case 'participant-details':
        return <ParticipantDetails onBack={() => setCurrentPage('event-detail')} />;
      case 'id-card-designer':
        return <IdCardDesigner onBack={() => setCurrentPage('bantalan-settings')} />;
      case 'bantalan-settings':
        return (
          <BantalanSettings 
            onBack={() => setCurrentPage('event-detail')}
            onIdCardClick={() => setCurrentPage('id-card-designer')}
          />
        );
      case 'event-detail':
        return (
          <EventDetail 
            onBack={() => setCurrentPage('dashboard')}
            onPengaturanAcaraClick={() => setCurrentPage('bantalan-settings')}
            onPesertaIndividuClick={() => setCurrentPage('participant-details')}
            onPertandinganClick={() => setCurrentPage('scoring-qualification')}
            onSertifikatClick={() => setCurrentPage('certificate')}
          />
        );
      case 'dashboard':
      default:
        return (
          <Dashboard 
            onEventClick={() => setCurrentPage('event-detail')}
            onCreateEventClick={() => setCurrentPage('create-event')}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <>
      {renderCurrentPage()}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;