import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from './Login';

const HomePage = ({ onLoginSuccess }) => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleCreateAccount = (username, password) => {
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      setError('Username already exists. Please choose another one.');
      return;
    }
    const newUser = { username, password, tasks: [] };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setError('');
    alert('Account created successfully!');
  };

  const handleLogin = (username, password) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      onLoginSuccess(user);
      history.push('/app'); // Redirect to AppPage after successful login
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div>
      <h1>Welcome to the Scheduler App</h1>
      <CreateAccount onCreateAccount={handleCreateAccount} />
      <Login onLogin={handleLogin} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HomePage;
