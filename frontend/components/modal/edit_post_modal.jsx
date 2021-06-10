import React from 'react';

class EditPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.post
    this.updateBody = this.updateBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateBody(e) {
    e.preventDefault();
    this.setState({
      body: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editPost(this.state);
    this.props.updateModal();
  }

  render() {
    return <div className="modal-box new-post-modal-box" onClick={(e) => e.stopPropagation()}>
      <header>
        <h4>Edit post</h4>
        <i className="fas fa-times" onClick={() => this.props.updateModal()}></i>
      </header>
      <div>
        <img src={this.props.user.profilePhotoUrl || window.defaultProfPic} />
        <p>{this.props.user.firstName} {this.props.user.lastName}</p>
      </div>
      <textarea rows="5" placeholder="What do you want to bark about?" value={this.state.body} onChange={this.updateBody}></textarea>
      {this.state.body ?
        <footer>
          <button onClick={this.handleSubmit}>Save</button>
        </footer>
        :
        <footer>
          <p>Post</p>
        </footer>
      }
    </div>
  }

}

export default EditPostModal;
