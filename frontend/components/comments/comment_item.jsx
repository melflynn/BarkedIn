import React from 'react';

const CommentItem = (props) => (
  <li>
    <img src={props.comment.author.profilePhotoUrl || window.defaultProfPic}/>
    <div>
      <div>
        <p>{`${props.comment.author.firstName} ${props.comment.author.lastName}`}</p>
        <p>{props.comment.author.breed}</p>
      </div>
      <div>
        {props.comment.body}
      </div>
    </div>
  </li>
)


export default CommentItem;