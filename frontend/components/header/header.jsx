import MeDropdown from './me_dropdown';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => (
  <header>
    <Link to="/">
      <img src="#" alt="BarkedInLogo" />
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
  </header>
)

export default Header;