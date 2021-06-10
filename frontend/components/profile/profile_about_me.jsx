import React from 'react';

class ProfileAboutMe extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPageUserId: props.userId,
    }
    // this.seeMore = this.seeMore.bind(this);
  }

  // seeMore(e) {
  //   e.preventDefault();
  //   this.setState({
  //     hiddenText: false
  //   });
  //   $('.blurb').removeClass('clipped');
  // }

  // componentDidUpdate () {
  //   if (this.props.userId !== this.state.currentPageUserId) {
  //     this.setState({
  //       currentPageUserId: this.props.userId,
  //       hiddenText: true
  //     })
  //   }
  // }

  render () {
    return <section className="about">
      <div>
        <h3>About</h3>
        {this.props.userId === this.props.currentUser.id.toString() ? <i className="fas fa-pencil-alt" onClick={() => this.props.updateModal('EditAboutMe')}></i> : ''}
      </div>
      <div>
        <p className="blurb clipped">{this.props.user ? this.props.user.aboutMe : ''}</p>
        {this.props.hiddenText && ($('.blurb').prop('scrollHeight') > $('.blurb').prop('clientHeight')
          || this.props.user && this.props.user.aboutMe && this.props.user.aboutMe.length > 315) ?
          <span>...<a onClick={this.seeMore}>see more</a></span> : ''}
      </div>
    </section>
  }
}

export default ProfileAboutMe;