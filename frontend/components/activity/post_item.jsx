import React from 'react';
import { Link } from 'react-router-dom';

class PostItem extends React.Component {

  render () {

    if (this.props.post) {
      return <li className="post-item">
        <header>
          <img src={this.props.user.profilePhotoUrl || window.defaultProfPic} />
          <article>
            <Link to={`/users/${this.props.user.id}`}><h2>{this.props.user.firstName} {this.props.user.lastName}</h2></Link>
            <p>{this.props.user.breed ? this.props.user.breed : ''}</p>
          </article>
        </header>
        <div>
          {this.props.post.body}
        </div>
      </li>
    } else {
      return null;
    }
  }
}

export default PostItem;

