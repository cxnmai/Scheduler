import React, { useState } from 'react';

const CreateAccount = ({ onCreateAccount }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateAccount(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px', border: 'none' }}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
