import React from 'react';

class DeletePhotoModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: `/api/users/${this.props.userId}`
    }).then(() => {
      this.props.toggleDeletePhotoModal();
      this.props.updateModal();
      this.props.updatePhoto(window.defaultProfPic);
    });
  }

  render() {
    return (
      <div className="modal-box delete-photo-modal-box" onClick={(e) => e.stopPropagation()}>
        <header>
          <h4>Delete?</h4>
          <i className="fas fa-times" onClick={this.props.toggleDeletePhotoModal}></i>
        </header>
        <div>
          Are you sure you want to delete your profile photo?
        </div>
        <footer>
          <button onClick={this.props.toggleDeletePhotoModal}>Cancel</button>
          <button onClick={this.handleSubmit}>Delete</button>
        </footer>
      </div>
    )
  }
}

export default DeletePhotoModal;