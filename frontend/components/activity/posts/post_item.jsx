import React from 'react';
import { Link } from 'react-router-dom';
import EditPostDropdown from '../../dropdown/edit_post_dropdown';
import Dropdown from '../../dropdown/dropdown';
import { createReaction, updateReaction, fetchReaction, deleteReaction } from '../../../util/reaction_util';
import { createComment, fetchComments } from '../../../util/comment_util';

class PostItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      reactionCount: this.props.post.reactions.ids.length,
      commentCount: this.props.post.comments.ids.length,
      commentBody: '',
      offset: 0
    }
    this.addReaction = this.addReaction.bind(this);
    this.removeReaction = this.removeReaction.bind(this);
    this.updateCommentBody = this.updateCommentBody.bind(this);
    this.postComment = this.postComment.bind(this);
    this.getComments = this.getComments.bind(this);
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
      .then(() => {
        this.setState((prevState) => ({
          commentCount: prevState.commentCount + 1,
          commentBody: ''
        }))
      })
  }

  getComments (e) {
    e.preventDefault();
    fetchComments(this.props.post.id, 2, this.state.offset)
      .then((comments) => {
        // console.log(Object.values(comments))
        this.setState((prevState) => ({
          offset: prevState.offset + 2,
          comments: Object.values(comments)
        }))
      })
    // this.setState((prevState) => ({
    //   offset: prevState.offset + 2
    // }))
  }

  render () {

    let reactButton;
    // console.log(this.state.comments)
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
          <div className="reactions-and-comments">
            {this.state.reactionCount > 0 ? 
              <div className="reactions-count">
                <i className="fas fa-dog"></i>
                <i className="fas fa-paw"></i>
                <i className="fas fa-bone"></i>
                <p>{this.state.reactionCount}</p>
              </div>
            : ''}
            {this.state.reactionCount > 0 && this.state.commentCount > 0 ?
            <p>•</p> : ''
            }
            {this.state.commentCount > 0 ?
            this.state.commentCount == 1 ?
              <div>
                <p onClick={this.getComments}>{`${this.state.commentCount} comment`}</p>
              </div>
            :
              <div>
                <p onClick={this.getComments}>{`${this.state.commentCount} comments`}</p>
              </div>
            : ''}
          </div>
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
            <form>
            <label>
              <input type="text" placeholder="Add a comment..." value={this.state.commentBody} onChange={this.updateCommentBody}/>
            </label>
            {this.state.commentBody ? 
            <button onClick={this.postComment}>Post</button> :
            null
            }
            </form>
          </div>
        </div>
        :
        ''}
        {this.state.comments ?
        <div>
         {this.state.comments.map((comment, i) => {
           return <p>{comment.body}</p>
         }) }
        </div>
        : ''}
      </li>
    } else {
      return null;
    }
  }
}

export default PostItem;

