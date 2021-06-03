import React from 'react';

class EditProfileIntroModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: props.currentUser
    }
  }

  render () {
    return (
      <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}></div>
    )
  }

}
// const EditProfileModal = (props) => (
//   <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}>
//     <header>
//       <h4>{props.user.firstName} {props.user.lastName}</h4>
//       <i className="fas fa-times" onClick={() => props.updateModal()}></i>
//     </header>
//     <h5>Contact Info</h5>
//     <ul>
//       <li>
//         <img src={window.inOnlyLogoWhite} />
//         <div>
//           <p>{props.user.id === props.currentUser.id ? 'Your Profile' : `${props.user.firstName}'s Profile`}</p>
//           <p>{process.env.NODE_ENV === "production" ? `https://barked-in.herokuapp.com/users/${props.user.id}` : `localhost:3000/users/${props.user.id}`}</p>
//         </div>
//       </li>
//       <li>
//         <i className="far fa-envelope"></i>
//         <div>
//           <p>Email</p>
//           <p>{props.user.email}</p>
//         </div>
//       </li>
//     </ul>
//   </div>
// )


export default EditProfileIntroModal;