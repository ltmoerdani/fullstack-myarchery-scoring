import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { LoginPage } from '@/components/LoginPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true to show dashboard by default

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Dashboard />
      <Toaster />
    </>
  );
}

export default App;