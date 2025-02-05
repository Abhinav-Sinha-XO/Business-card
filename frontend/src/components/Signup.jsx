import React, { useState } from 'react';

function Signup({ setView }) {
  // Local state for signup form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Choose user type to decide which endpoint to call (user or admin)
  const [userType, setUserType] = useState('user'); // options: 'user' or 'admin'

  const handleSignup = async (e) => {
    e.preventDefault();
    // Choose the proper endpoint based on user type
    const endpoint = userType === 'admin' ? '/admin/signup' : '/signup';
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || data.msg || 'Signup successful!');
        // After signup, switch to signin view
        setView('signin');
      } else {
        alert(data.error || data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Signup form */}
      <form onSubmit={handleSignup}>
        <div>
          <label>User Type: </label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
