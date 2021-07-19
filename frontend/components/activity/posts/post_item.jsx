import React from 'react';
import { Link } from 'react-router-dom';
import EditPostDropdown from '../../dropdown/edit_post_dropdown';
import Dropdown from '../../dropdown/dropdown';
import { createReaction, updateReaction, fetchReaction, deleteReaction } from '../../../util/reaction_util';

class PostItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      reactionCount: this.props.post.reactions.ids.length
    }
    this.addReaction = this.addReaction.bind(this);
    this.removeReaction = this.removeReaction.bind(this);
  }

  componentDidMount () {
    if (this.props.post.likers.ids.includes(this.props.currentUser.id)) {
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

