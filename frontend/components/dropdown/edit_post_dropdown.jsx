import React from 'react';


const EditPostDropdown = (props) => {
  console.log(props.post)
  return (
  <div>
    <p id="edit-post-dropdown-parent" onClick={props.dropdownDisplay}>...</p>
    {props.showDropdown ? (
      <div id="edit-post-dropdown" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li onClick={(e) => { props.dropdownHide(e); props.updateModal('EditPost', props.post) }}>
            <i className="fas fa-pencil-alt"></i>
            <p>Edit Post</p>
          </li>
          <li onClick={(e) => { props.dropdownHide(e); props.updateModal('DeletePost', props.post) }}>
            <i className="fas fa-trash-alt"></i>
            <p>Delete Post</p>
          </li>
        </ul>
      </div>
    ) : ''
    }
  </div>
)}

export default EditPostDropdown;