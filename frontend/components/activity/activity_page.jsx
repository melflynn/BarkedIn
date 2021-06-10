import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from '../home_page/user_sidebar';

class ActivityPage extends React.Component {

  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUser(this.props.userId)
    }
  }

  render () {
    if (this.props.user) {
      return <div className="feed-page">
        <header>
          <HeaderContainer photo={this.props.currentUser.profilePhotoUrl} />
        </header>
        <main className="feed-main">
          <UserSidebar user={this.props.user} />
          <div className="activity-header">
            <h3>{`${this.props.user.firstName}'s Activity`}</h3>
            <p>Posts</p>
          </div>
        </main>
      </div>
    } else {
      return null;
    }
  }
}

export default ActivityPage;

// class Feed extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     if (!this.props.user) {
//       this.props.fetchUser(this.props.userId)
//     }
//   }

//   render() {
//     let modal;
//     switch (this.props.modal) {
//       case 'NewPost':
//         modal = <Modal
//           name={this.props.modal}
//           user={this.props.user}
//           updateModal={this.props.updateModal}
//           createPost={this.props.createPost}
//         />
//         break;
//       default:
//         modal = '';
//     }

//     return <div className="feed-page">
//       {modal}
//       <header>
//         <HeaderContainer photo={this.props.user.profilePhotoUrl} />
//       </header>
//       <main className="feed-main">
//         <UserSidebar user={this.props.user} />
//         <NewPost user={this.props.user} modal={this.props.modal} updateModal={this.props.updateModal} />
//       </main>
//     </div>
//   }
// }

// export default Feed;