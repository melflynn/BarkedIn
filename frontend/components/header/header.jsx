import MeDropdown from '../dropdown/me_dropdown';
import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../dropdown/dropdown';

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
        <Link to="/mynetwork">
          <i className="fas fa-user-friends"></i>
          <p>My Network</p>
        </Link>
        <Dropdown name='MeDropdown' user={props.user} logout={props.logout} photo={props.photo}/>
      </nav>
    </nav>
  </header>
)

export default Header;