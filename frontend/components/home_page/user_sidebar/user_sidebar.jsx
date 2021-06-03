import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = (props) => (
  <div className="user-sidebar">
    <div className="background">
      <div></div>
      <div></div>
    </div>
    <div>
      <p className="profile-photo"><img src={props.user.profilePhotoUrl} /></p>
      <Link to={`/users/${props.user.id}`}>{props.user.firstName} {props.user.lastName}</Link>
      <p>{props.user.breed}</p>
    </div>
  </div>
)

export default UserSidebar;