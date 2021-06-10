import React from 'react';
import { Link } from 'react-router-dom';

const ProfileIntro = (props) => {
  const connectionCount = props.user.connections ? props.user.connections.ids.length + props.accepted : null;
  let interact;
  switch (props.status) {
    case "self":
      interact = '';
      break;
    case "connected":
      interact =
        <div className="connection-response">
          <p>Connected</p>
          <button className="remove-connection" onClick={props.removeConnection}>Remove Connection</button>
        </div>;
      break;
    case "requested":
      interact =
        <div className="connection-response">
          <button onClick={props.acceptRequest}>Accept</button>
          <button onClick={props.removeConnection}>Ignore</button>
        </div>;
      break;
    case "pending":
      interact =
        <p className="connection-response">Pending</p>;
      break;
    default:
      interact =
        <div className="connection-response">
          <button onClick={props.makeRequest}>Connect</button>
        </div>;
  }
  
  return <section className="intro">
    <div className="background">
      <div>
      </div>
      <div>
        {props.userId === props.currentUser.id.toString() ? <i className="fas fa-pencil-alt" onClick={() => props.updateModal('EditProfileIntro')}></i> : ''}
      </div>
    </div>
    <div>
      {props.userId === props.currentUser.id.toString() ?
        <img src={props.photo ? props.photo : props.user ? props.user.profilePhotoUrl || window.defaultProfPic : ''}
          id="editable-prof-pic"
          onClick={() => props.updateModal('ProfilePhoto')} /> :
        <img src={props.user.profilePhotoUrl || window.defaultProfPic} />
      }
      <h3>{props.user.firstName} {props.user.lastName}</h3>
      <h4>{props.user.breed ? props.user.breed : ''}</h4>
      <h5>{`${props.user.region ? `${props.user.region}, ` : ''} ${props.user.country ? props.user.country : ''}`}
        <p>•</p>
        <p onClick={() => props.updateModal('ContactInfo')}>Contact info</p>
      </h5>
      <Link to={`/users/${props.user.id}/connections`}><p id="connectionCount">{connectionCount === 1 ? `${connectionCount} connection` : connectionCount > 500 ? `500+ connections` : `${connectionCount} connections`}</p></Link>

      {interact}

    </div>
  </section>
}

export default ProfileIntro;