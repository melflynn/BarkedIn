import React from 'react';
import ContactInfoModal from './contact_info_modal';
import EditProfileIntroModal from './edit_profile_intro_modal';


const Modal = (props) => {

  let modal;
  let {name, ...otherProps} = props;

  switch (props.name) {
    case "ContactInfo":
      modal = <ContactInfoModal {...otherProps}/>;
    case "EditProfileIntro":
      modal = <EditProfileIntroModal {...otherProps}/>
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