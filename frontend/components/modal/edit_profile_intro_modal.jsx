import React from 'react';

class EditProfileIntroModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = Object.assign({}, props.currentUser, {errors: {}})
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
    let updateErrors = {};
    if (!this.state.firstName) {
      updateErrors['firstName'] = 'Please enter your first name.';
    }
    if (!this.state.lastName) {
      updateErrors['lastName'] = 'Please enter your last name.';
    }

    if (Object.keys(updateErrors).length === 0) {
      this.props.updateUser(this.state);
      this.props.updateModal();
    } else {
      this.setState({
        errors: updateErrors
      })
    }
  }

  render () {
    return (
      <div className="modal-box edit-profile-intro-modal-box" onClick={(e) => e.stopPropagation()}>
        <header>
          <h4>Edit Intro</h4>
          <i className="fas fa-times" onClick={() => this.props.updateModal()}></i>
        </header>
        <form>
          <div>
            <div>
              <label>First Name *
                <input type="text" value={this.state.firstName} onChange={this.updateItem('firstName')}/>
              </label>
              {this.state.errors.firstName ? <p className="edit-about-me-errors">{this.state.errors.firstName}</p> : ''}
            </div>
            <div>
              <label>Last Name *
                <input type="text" value={this.state.lastName} onChange={this.updateItem('lastName')}/>
              </label>
              {this.state.errors.lastName ? <p className="edit-about-me-errors">{this.state.errors.lastName}</p> : ''}
            </div>
          </div>
          <label>Breed
            <input type="text" value={this.state.breed || ''} onChange={this.updateItem('breed')}/>
          </label>
          <div>
            <label>Country
              <input type="text" value={this.state.country || ''} onChange={this.updateItem('country')}/>
            </label>
            <label>City/State
              <input type="text" value={this.state.region || ''} onChange={this.updateItem('region')}/>
            </label>
          </div>
          <footer>
            <button onClick={this.handleSubmit}>Save</button>
          </footer>          
        </form>
      </div>
    )
  }

}


export default EditProfileIntroModal;