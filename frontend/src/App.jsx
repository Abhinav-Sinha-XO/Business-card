import React, { useState } from 'react';
// Import our components
import Signup from './components/Signup';
import Signin from './components/Signin';
import CreateCard from './components/CreateCard';
import CardList from './components/CardList';

function App() {
  // State to hold the authentication token and logged-in username
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  // State to manage which view is currently active (signin, signup, or dashboard)
  const [view, setView] = useState('signin');
  const [userType,setUserType] = useState('user')

  // Logout function clears the auth token and resets the view
  const handleLogout = () => {
    setToken(null);
    setUsername('');
    setView('signin');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Card App</h1>
      {/* Navigation buttons based on auth status */}
      {!token ? (
        <div>
          <button onClick={() => setView('signin')}>Sign In</button>
          <button onClick={() => setView('signup')}>Sign Up</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Render the appropriate component based on current view */}
      {view === 'signup' && <Signup setView={setView} />}
      {view === 'signin' && (
        <Signin setToken={setToken} setUsername={setUsername} setView={setView} />
      )}
      {view === 'dashboard' && token && (
        <div>
          <h2>Welcome, {username}</h2>
          <CreateCard token={token} userType={userType} />
          <CardList token={token} userType={userType} />
        </div>
      )}
    </div>
  );
}

export default App;
