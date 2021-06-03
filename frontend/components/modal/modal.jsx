import React from 'react';
import ContactInfoModal from './contact_info_modal';


const Modal = (props) => {

  let modal;
  switch (props.name) {
    case "ContactInfo":
      modal = <ContactInfoModal {...props}/>;
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