import MeDropdown from './me_dropdown';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => (
  <header>
    <nav>
      <Link to="/">
        <img src={window.inOnlyLogoWhite} />
      </Link>
      <nav className="header-nav">
        <Link to="/feed">
          <i>Home</i>
        </Link>
        <Link to="#">
          <i>Network</i>
        </Link>
        <MeDropdown user={props.user} logout={props.logout}/>
      </nav>
    </nav>
  </header>
)

export default Header;