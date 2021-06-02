import React from 'react';

const UserSidebar = (props) => (
  <div className="user-sidebar">
    <p>{props.user.firstName} {props.user.lastName}</p>
    <p>{props.user.breed}</p>
  </div>
)

export default UserSidebar;