import MeDropdown from './me_dropdown';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => (
  <header className="main-header">
    <nav>
      <Link to="/">
        <img src={window.inOnlyLogoWhite} />
      </Link>
      <nav className="header-nav">
        <Link to="/feed">
          <i className="fas fa-home"></i>
          <p>Home</p>
        </Link>
        <Link to="#">
          <i className="fas fa-user-friends"></i>
          <p>Network</p>
        </Link>
        <MeDropdown user={props.user} logout={props.logout}/>
      </nav>
    </nav>
  </header>
)

export default Header;