import React from 'react';
import { Link } from 'react-router-dom';

const CommentItem = (props) => (
  <li className="comment-item">
    <img src={props.comment.author.profilePhotoUrl || window.defaultProfPic}/>
    <div className="comment">
      <div>
        <Link to={`/users/${props.comment.authorId}`} className="commenter-name">{`${props.comment.author.firstName} ${props.comment.author.lastName}`}</Link>
        <p className="commenter-breed">{props.comment.author.breed}</p>
      </div>
      <div>
        {props.comment.body}
      </div>
    </div>
  </li>
)


export default CommentItem;