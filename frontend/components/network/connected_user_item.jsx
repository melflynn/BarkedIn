import React from 'react';

const ConnectedUserItem = (props) => (
  <li className="connected-user-item">
    <img src={props.connectedUser.profilePhotoUrl || window.defaultProfPic} />
    <div>
      <h3>{props.connectedUser.firstName} {props.connectedUser.lastName}</h3>
      <p>{props.connectedUser.breed ? props.connectedUser.breed : ''}</p>
      <p>{props.connectedUser.region ? `${props.connectedUser.region}, ` : ''} {props.connectedUser.country ? `${props.connectedUser.country}` : ''}</p>
    </div>
  </li>
)

export default ConnectedUserItem;