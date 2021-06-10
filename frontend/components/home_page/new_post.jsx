import React from 'react';

const NewPost = (props) => (
  <div className="new-post">
    <img src={props.user.profilePhotoUrl || window.defaultProfPic}/>
    <button onClick={() => props.updateModal('NewPost')}>Start a post</button>
  </div>
)

export default NewPost;