import React, { useState } from 'react';
import Home from './components/Home';
import Bookings from './components/Bookings';
import Login from './components/Login';

function App() {
  const [page, setPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage('bookings');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setPage('home');
  };

  return (
    <>
      {page === 'home' && <Home onGoToBookings={() => setPage('bookings')} isLoggedIn={isLoggedIn} onLogout={logout} />}
      {page === 'bookings' && isLoggedIn && <Bookings onGoToHome={() => setPage('home')} onLogout={logout} />}
      {(page === 'login' || (!isLoggedIn && page === 'bookings')) && <Login onLoginSuccess={handleLoginSuccess} onGoToHome={() => setPage('home')} />}
    </>
  );
}

export default App;