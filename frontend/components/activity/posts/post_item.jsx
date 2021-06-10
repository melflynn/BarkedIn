import React from 'react';
import { Link } from 'react-router-dom';
import EditPostDropdown from './edit_post_dropdown';

class PostItem extends React.Component {

  render () {

    if (this.props.post) {
      return <li className="post-item">
        <header>
          <img src={this.props.user.profilePhotoUrl || window.defaultProfPic} />
          <article>
            <div>
              <Link to={`/users/${this.props.user.id}`}><h2>{this.props.user.firstName} {this.props.user.lastName}</h2></Link>
              <p>{this.props.user.breed ? this.props.user.breed : ''}</p>
            </div>
          </article>
          <EditPostDropdown />
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

