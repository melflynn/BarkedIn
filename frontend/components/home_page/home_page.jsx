import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <header>
      <nav>
        <Link to="/">
          <img src="#" alt="BarkedInLogo" />
        </Link>
        <Link to="/signup" className="signup-nav">Join now</Link>
        <Link to="/login" className="login-nav">Sign In</Link>
      </nav>
      <h1>Welcome to your professional community</h1>
    </header>
  </div>
)

export default HomePage;
