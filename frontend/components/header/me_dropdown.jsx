import React from 'react';
import { Link } from 'react-router-dom';

const MeDropdown = (props) => {
  return <div>
    <div id="me-dropdown-parent" onClick={props.dropdownDisplay}>
      <img src={props.photo || window.defaultProfPic} />
      <div>
        <p>Me</p>
        <p></p>
      </div>
    </div>
    {props.showDropdown ? (
      <div id="me-dropdown" onClick={(e) => e.stopPropagation()}>
         <div>
           <div>
             <img src={props.photo || window.defaultProfPic} />
             <div>
               <p>{props.user.firstName} {props.user.lastName}</p>
               <p>{props.user.breed}</p>
             </div>
           </div>
           <p className="link" onClick={props.dropdownHide}><Link to={`/users/${props.user.id}`}>View Profile</Link></p>
         </div>
         <button onClick={props.logout}>Sign Out</button>
      </div>
    ) : ''
    }
  </div>
}

export default MeDropdown;
