import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import AppPage from './components/AppPage';
import AboutPage from './components/AboutPage';
import './theme.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
  };

  return (
    <Router>
      <div>
        <nav style={{ backgroundColor: 'var(--secondary-color)', padding: '10px' }}>
          <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Home</Link>
          <Link to="/app" style={{ margin: '0 10px', color: 'white' }}>App</Link>
          <Link to="/about" style={{ margin: '0 10px', color: 'white' }}>About</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <HomePage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/app" render={() => loggedInUser ? <AppPage user={loggedInUser} /> : <Redirect to="/" />} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
