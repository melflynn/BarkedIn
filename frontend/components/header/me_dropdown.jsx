import React from 'react';

const MeDropdown = ({user, logout}) => {
  console.log(user, logout)
  return <div>
    Me
    <div className="me-dropdown">
      <p>{user.firstName} {user.lastName}</p>
      <p>{user.jobTitle}</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  </div>
}

export default MeDropdown;
