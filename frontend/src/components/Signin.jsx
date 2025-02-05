import React, { useState } from 'react';

function Signin({ setToken, setUsername, setView }) {
  // Local state for signin form inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // options: 'user' or 'admin'

  const handleSignin = async (e) => {
    e.preventDefault();
    // Choose the proper endpoint based on user type
    const endpoint = userType === 'admin' ? '/admin/signin' : '/user/signin';
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password }),
      });
      const data = await response.json();
      // Check if token is returned
      if (data.token) {
        setToken(data.token);
        setUsername(usernameInput);
        setView('dashboard');
      } else {
        alert(data.msg || 'Signin failed');
      }
    } catch (err) {
      console.error('Error during signin:', err);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {/* Signin form */}
      <form onSubmit={handleSignin}>
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
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
