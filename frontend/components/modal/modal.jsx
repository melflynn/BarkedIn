import React from 'react';
import ContactInfoModal from './contact_info_modal';
import EditProfileIntroModal from './edit_profile_intro_modal';
import ProfilePhotoModal from './profile_photo_modal';
import EditAboutMeModal from './edit_about_me_modal';

const Modal = (props) => {

  let modal;
  let {name, ...otherProps} = props;

  switch (props.name) {
    case "ContactInfo":
      modal = <ContactInfoModal {...otherProps}/>;
      break;
    case "EditProfileIntro":
      modal = <EditProfileIntroModal {...otherProps}/>;
      break;
    case "ProfilePhoto":
      modal = <ProfilePhotoModal {...otherProps}/>;
      break;
    case "EditAboutMe":
      modal = <EditAboutMeModal {...otherProps}/>;
      break;
  }

  return (
    <div>
      <div className="modal-background" onClick={props.updateModal}>
        {modal}
      </div>
    </div>
  )
}


export default Modal;