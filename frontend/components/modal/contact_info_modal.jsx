import React from 'react';


class ContactInfoModal extends React.Component {
  hideClick() {

    setTimeout(() => {
      if (this.state.showDropdown) {
        window.addEventListener('click', this.hideModal)
      } else {
        window.removeEventListener('click', this.hideModal)
      }
    }, 0)

  }

  render () {
    return (
      <div>
        <div className="modal-background">
          <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}>
            <header>
              <h4>{props.user.firstName} {props.user.lastName}</h4>
              <i className="fas fa-times"></i>
            </header>
            <h5>Contact Info</h5>
            <ul>
              <li>
                <img src={window.inOnlyLogoWhite}/>
                <div>
                  <p>{props.user.id === props.currentUser.id ? 'Your Profile' : `${props.user.firstName}'s Profile`}</p> 
                  <p>{process.env.NODE_ENV === "production" ? `https://barked-in.herokuapp.com/users/${props.user.id}` : `localhost:3000/users/${props.user.id}`}</p>
                </div>
              </li>
              <li>
                <i className="far fa-envelope"></i>
                <div>
                  <p>Email</p>
                  <p>{props.user.email}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactInfoModal;