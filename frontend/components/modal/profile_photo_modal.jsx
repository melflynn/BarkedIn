import React from 'react';
import { fetchUser } from '../../actions/user_actions';

class ProfilePhotoModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      photo: this.props.user.profilePhotoUrl,
      photoFile: null,
      newPhoto: false
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleFile (e) {
    this.setState({
      photo: URL.createObjectURL(e.currentTarget.files[0]),
      photoFile: e.currentTarget.files[0],
      newPhoto: true
    })
  }

  handleUpdate (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[profile_photo]', this.state.photoFile);
    $.ajax({
      method: 'PATCH',
      url: `/api/users/${this.props.user.id}`,
      data: formData,
      contentType: false,
      processData: false
    }).then(() => this.props.updateModal())
  }
    
  render () {
    return (
      <div className="modal-box profile-photo-modal-box" onClick={(e) => e.stopPropagation()}>
      <header>
        <h4>Profile Photo</h4>
        <i className="fas fa-times" onClick={() => this.props.updateModal()}></i>
      </header>
      <div>
        <img src={this.state.photo}/>
      </div>
      {this.state.newPhoto ? 
        <div>
          <div></div>
          <button onClick={this.handleUpdate}>Save Photo</button>
        </div> :
        <div>
          <ul>
            <li>
              <i className="fas fa-pencil-alt"></i>
              <p>Edit</p>
            </li>
            <li>
              <label>
                <input type="file" onChange={this.handleFile}/>
              </label>
              <i className="fas fa-camera"></i>
              <p>Add Photo</p>
            </li>
          </ul>
          <div>
            <i className="fas fa-trash-alt"></i>
            <p>Delete</p>
          </div>
        </div> 
      }
    </div>
    )
  }
}



export default ProfilePhotoModal;