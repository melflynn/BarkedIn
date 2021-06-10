import React from 'react';

class DeletePostModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.deletePost(this.props.post.id)
      .then(() => this.props.updatedPost());
    this.props.updateModal();
  }

  render () {
    return (
      <div className="modal-box delete-photo-modal-box" onClick={(e) => e.stopPropagation()}>
        <header>
          <h4>Delete?</h4>
          <i className="fas fa-times" onClick={this.props.updateModal}></i>
        </header>
        <div>
          Are you sure you want to delete this post?
        </div>
        <footer>
          <button onClick={this.props.updateModal}>Cancel</button>
          <button onClick={this.handleSubmit}>Delete</button>
        </footer>
      </div>
    )
  }
}

export default DeletePostModal;