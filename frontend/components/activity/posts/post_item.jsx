import React from 'react';
import { Link } from 'react-router-dom';
import EditPostDropdown from '../../dropdown/edit_post_dropdown';
import Dropdown from '../../dropdown/dropdown';
import { createReaction, updateReaction, fetchReaction, deleteReaction } from '../../../util/reaction_util';
import { createComment } from '../../../util/comment_util';

class PostItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      reactionCount: this.props.post.reactions.ids.length,
      commentBody: ''
    }
    this.addReaction = this.addReaction.bind(this);
    this.removeReaction = this.removeReaction.bind(this);
    this.updateCommentBody = this.updateCommentBody.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  componentDidMount () {
    if (!this.props.profile && this.props.post.likers.ids.includes(this.props.currentUser.id)) {
      fetchReaction(this.props.post.id)
        .then((reaction) => {
          this.setState({
            reaction
          })
        })
    }
  }

  removeReaction () {
    deleteReaction(this.props.post.id, this.state.reaction.id)
      .then(() => {
        this.setState((prevState) => ({
          reaction: null,
          reactionCount: prevState.reactionCount - 1
        }))
      })
  }

  addReaction (type) {
    if (this.state.reaction) {
      updateReaction(this.props.post.id, type, this.state.reaction.id)
        .then((reaction) => {
          console.log(reaction);
          this.setState(() => ({
            reaction
          }))
        })
    } else {
      createReaction(this.props.post.id, type)
        .then((reaction) => {
          this.setState((prevState) => ({
            reactionCount: prevState.reactionCount + 1,
            reaction
          }))
        })
    }
  }

  updateCommentBody (e) {
    e.preventDefault();
    this.setState({
      commentBody: e.target.value
    })
  }

  postComment (e) {
    e.preventDefault();
    createComment(this.props.post.id, this.state.commentBody)
  }

  render () {

    let reactButton;
    // console.log(this.state.reaction)
    // debugger;
    if (this.state.reaction) {
      switch(this.state.reaction.reactionType) {
        case "wag":
          reactButton = <div className="reacted-dog" onClick={this.removeReaction}>
            <i className="fas fa-dog"></i>
            <p>Wag</p>
          </div>
          break;
        case "high five":
          reactButton = <div className="reacted-paw" onClick={this.removeReaction}>
            <i className="fas fa-paw"></i>
            <p>High Five</p>
          </div>
          break;
        case "throw a bone":
          reactButton = <div className="reacted-bone" onClick={this.removeReaction}>
            <i className="fas fa-bone"></i>
            <p>Throw a bone</p>
          </div>
          break;
      }
    }

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
          {this.state.reactionCount > 0 ? 
            <div className="reactions-count">
              <i className="fas fa-dog"></i>
              <i className="fas fa-paw"></i>
              <i className="fas fa-bone"></i>
              <p>{this.state.reactionCount}</p>
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
              {this.state.reaction ? 
                reactButton
                :
                <div className="unreacted" onClick={() => this.addReaction('wag')}>
                  <i className="fas fa-dog"></i>
                  <p>Wag</p>
                </div>
              }
            </div>
            {/* <div>
              <i className="far fa-comment"></i>
              <p>Comment</p>
            </div> */}
          </div>
          <div className="new-comment">
            <img src={this.props.currentUser.profilePhotoUrl || window.defaultProfPic}></img>
            <label>
              <input type="text" placeholder="Add a comment..." onChange={this.updateCommentBody}/>
            </label>
            {this.state.commentBody ? 
            <button onClick={this.postComment}>Post</button> :
            null
            }
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

