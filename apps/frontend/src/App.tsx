import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { EventDetail } from '@/components/EventDetail';
import { BantalanSettings } from '@/components/BantalanSettings';
import { IdCardDesigner } from '@/components/IdCardDesigner';
import { ParticipantDetails } from '@/components/ParticipantDetails';
import { ScoringQualification } from '@/components/ScoringQualification';
import { ScoringEliminasi } from '@/components/ScoringEliminasi';
import { LoginPage } from '@/components/LoginPage';
import { Toaster } from '@/components/ui/toaster';

type CurrentPage = 'login' | 'dashboard' | 'event-detail' | 'bantalan-settings' | 'id-card-designer' | 'participant-details' | 'scoring-qualification' | 'scoring-eliminasi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true to show dashboard by default
  const [currentPage, setCurrentPage] = useState<CurrentPage>('scoring-eliminasi'); // Set to scoring-eliminasi for testing

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <Toaster />
      </>
    );
  }

  // Handle page navigation
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'scoring-eliminasi':
        return <ScoringEliminasi onBack={() => setCurrentPage('event-detail')} />;
      case 'scoring-qualification':
        return <ScoringQualification onBack={() => setCurrentPage('event-detail')} />;
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
          />
        );
      case 'dashboard':
      default:
        return <Dashboard onEventClick={() => setCurrentPage('event-detail')} />;
    }
  };

  return (
    <>
      {renderCurrentPage()}
      <Toaster />
    </>
  );
}

export default App;