import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => (
  <div>
    <header>
      <nav className="home-page-nav">
        <section className="right-nav">
          <Link to="/">
            <img src={window.inLogoWhite} />
          </Link>
        </section>
        <section className="left-nav">
          <Link to="/signup" className="signup-nav">Join now</Link>
          <Link to="/login" className="login-nav">Sign In</Link>
        </section>
      </nav>
    </header>
    <section className="home-page">
      <h1>Welcome to your <p>p<i className="fas fa-paw" style={{ 'fontSize': '40px' }}></i>wfessional</p> community</h1>
      <img src={window.splashDogs}/>
      <a href="https://www.vecteezy.com/free-vector/dog">Dog Vectors by Vecteezy</a>
    </section>
  </div>
)

export default HomePage;
