import React from 'react';

class EditProfileIntroModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = props.currentUser
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateItem (type) {
    return (e) => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.updateUser(this.state);
    this.props.updateModal();
  }

  render () {
    console.log(this.state);
    return (
      <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}>
        <header>
          <h4>Edit Intro</h4>
          <i className="fas fa-times" onClick={() => this.props.updateModal()}></i>
        </header>
        <form>
          <div>
            <label>First Name *
              <input type="text" value={this.state.firstName} onChange={this.updateItem('firstName')}/>
            </label>
            <label>Last Name *
              <input type="text" value={this.state.lastName} onChange={this.updateItem('lastName')}/>
            </label>
          </div>
            <label>Breed
              <input type="text" value={this.state.breed} onChange={this.updateItem('breed')}/>
            </label>
            <label>Country
              <input type="text" value={this.state.country} onChange={this.updateItem('country')}/>
            </label>
            <label>City/State
              <input type="text" value={this.state.region} onChange={this.updateItem('region')}/>
            </label>
            <button onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    )
  }

}
// const EditProfileModal = (props) => (
//   <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}>
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