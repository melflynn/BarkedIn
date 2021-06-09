import React from 'react';
import DeletePhotoModal from './delete_photo_modal';

class ProfilePhotoModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      photo: this.props.photo || this.props.user.profilePhotoUrl || window.defaultProfPic,
      photoFile: null,
      newPhoto: false,
      deletePhotoModal: false
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.dontSave = this.dontSave.bind(this);
    this.toggleDeletePhotoModal = this.toggleDeletePhotoModal.bind(this);
  }

  handleFile (e) {
    this.setState({
      photo: URL.createObjectURL(e.currentTarget.files[0]),
      photoFile: e.currentTarget.files[0],
      newPhoto: true
    })
  }

  dontSave (e) {
    e.preventDefault();
    this.setState({
      photo: this.props.user.profilePhotoUrl || window.defaultProfPic,
      photoFile: null,
      newPhoto: false
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
    }).then(() => {
      debugger;
      this.props.updateModal();
      this.props.updatePhoto(this.state.photo);
    })
  }

  toggleDeletePhotoModal () {
    this.setState({
      deletePhotoModal: !this.state.deletePhotoModal
    })
  }
    
  render () {

    let modal;

    if (this.state.deletePhotoModal) {
      modal = 
      <div className="modal-background" onClick={(e) => {
        e.stopPropagation();
        this.toggleDeletePhotoModal();
        }}>
        <DeletePhotoModal toggleDeletePhotoModal={this.toggleDeletePhotoModal} updatePhoto={this.props.updatePhoto} userId={this.props.user.id} updateModal={this.props.updateModal}/>;
      </div>
    } else {
      modal = '';
    }

    return (
      <div className="modal-box profile-photo-modal-box-wrapper">
        <div className="modal-box profile-photo-modal-box" onClick={(e) => e.stopPropagation()}>
          <header>
            <h4>Profile Photo</h4>
            <i className="fas fa-times" onClick={this.state.newPhoto ? this.dontSave : this.props.updateModal}></i>
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
                  <label>
                    <input type="file" accept=".png,.jpg,.jpeg" onChange={this.handleFile}/>
                  </label>
                  <i className="fas fa-camera"></i>
                  <p>Add Photo</p>
                </li>
              </ul>
              <div onClick={this.toggleDeletePhotoModal}>
                <i className="fas fa-trash-alt"></i>
                <p>Delete</p>
              </div>
            </div> 
          }
        </div>
        {modal}
      </div>
    )
  }
}



export default ProfilePhotoModal;