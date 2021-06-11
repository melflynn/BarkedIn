import React from 'react';
import { Link } from 'react-router-dom';
import EditPostDropdown from '../../dropdown/edit_post_dropdown';
import Dropdown from '../../dropdown/dropdown';
import { createReaction } from '../../../util/reaction_util';

class PostItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      
    }
    this.addReaction = this.addReaction.bind(this);
  }


  addReaction (type) {
    createReaction(this.props.post.id, type);
    this.setState((prevState) => ({
      reactionCount: prevState.reactionCount + 1
    }));
  }

  // componentDidUpdate () {
  //   if (!this.state.reactionCount) {
  //     this.setState({
  //       reactionCount: this.props.post.reactions.ids.length
  //     })
  //   }
  // }

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
          {!this.props.profile && this.props.currentUser.id === this.props.user.id ?
            <Dropdown name="EditPost" post={this.props.post} updateModal={this.props.updateModal} />
            :
            ''
          }
        </header>
        <div className="body">
          {this.props.post.body}
        </div>
        {!this.props.profile ? 
        <div>
          {this.props.post.reactions.ids.length > 0 ? 
            <div className="reactions-count">
              <i className="fas fa-dog"></i>
              <i className="fas fa-paw"></i>
              <i className="fas fa-bone"></i>
              <p>{this.props.post.reactions.ids.length}</p>
            </div>
          : ''}
          <div className="reactions">
            <div className="react-button">
                <div className="select-reactions">
                  <div className="reaction">
                    <i className="fas fa-dog" onClick={() => this.addReaction('wag')}></i>
                    <p>Wag</p>
                  </div>
                  <div className="reaction">
                    <i className="fas fa-paw" onClick={() => this.addReaction('high five')}></i>
                    <p>High five</p>
                  </div>
                  <div className="reaction">
                    <i className="fas fa-bone" onClick={() => this.addReaction('throw a bone')}></i>
                    <p>Throw a bone</p>
                  </div>
                </div>
                <i className="fas fa-dog"></i>
                <p>Wag</p>
            </div>
          </div>
        </div>
        :
        ''}
      </li>
    } else {
      return null;
    }
  }
}

export default PostItem;

