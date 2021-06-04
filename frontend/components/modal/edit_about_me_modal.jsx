import React from 'react';

class EditAboutMeModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAboutMe = this.updateAboutMe.bind(this);
  }

  updateAboutMe (e) {
    this.setState({
      aboutMe: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.updateUser(this.state);
    this.props.updateModal();
  }

  render () {
    return (
      <div className="modal-box edit-profile-intro-modal-box edit-about-me-modal-box" onClick={(e) => e.stopPropagation()}>
        <header>
          <h4>Edit summary</h4>
          <i className="fas fa-times" onClick={this.props.updateModal}></i>
        </header>
        <form>
          <label>Description
            <textarea cols="30" rows="10" value={this.state.aboutMe} onChange={this.updateAboutMe}></textarea>
          </label>
          <footer>
            <button onClick={this.handleSubmit}>Save</button>
          </footer>
        </form>
      </div>
    )
  }
}

export default EditAboutMeModal;