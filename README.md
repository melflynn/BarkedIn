# BarkedIn: A LinkedIn Clone, for dogs

[Live App](https://barked-in.herokuapp.com/#/)

BarkedIn is a fullstack clone of LinkedIn, but for dogs. Users can create their own profiles, connect with other dogs in their network and post to the news feed. 

## Technologies 

- Ruby on Rails
- React
- Redux
- PostgreSQL
- Jbuilder
- Webpack
- SCSS
- Amazon S3 hosting services

## Features

### Profiles

A user's profile displays their profile photo (hosted through S3), headline information, an about me section and a clip of their activity (the full extent of a user's activity can be viewed on the activity page). If a user is visiting their own profile, it includes the ability to upload a profile photo, delete a profile photo and reset it to the default photo, edit any of their 'about me' information. 


### Posts (+ Reactions & Comments)

User's can add posts to the network. If a post is their own, they have the ability to edit or delete it. User's can also comment on or react to posts with a variety of reactions including 'wag', 'high five' or 'throw a bone'. 

### Other features
#### Active
- User Authentication
- Connections
  - Add, or remove existing or pending connections
- News Feed
#### To be built
- Skills and endorsements
- People you may know
- Degree of connectivity
- Search

## Code Snippets

### Connections

Devising a plan for implementing connections and connection requests was a large task with a variety of implementation options. It was important that users be able to initiate, withdraw and respond to connection requests, as well as maintain a list of their connected users. While there were many possible approaches, I ultimately decided that my biggest priority was to best maintain the integrity of the data in the database. 

As such, there is only one data table for both connections and connection requests, and only one entry per connection. While there was a bit more code required to find a user on the table, this approach ensured that connections were always reciprocal and that updates to connection statuses (from pending to connected, or a withdrawn request or connection) were smooth. The potential for a bit of latency with searching users on the table was somewhat addressed with indexing both the user_id1, user_id2, and the pair, but would potentially need to be addressed further should the application be rescoped for a larger scale.

The data table includes a column for `user_id1`, `user_id2` and the connection `status`. There are check constraints on the table as well as model level validations to ensure that `user_id1` < `user_id2` (ensuring no duplicate connections) and `status` is either 'connected', 'pending_user1' or 'pending_user2'. 

Joins Table
| **Column**       | **Data Type**  | **Details**                    |
|------------------|----------------|--------------------------------|
| `id`             | integer        | not null, primary key          |
| `user_id1`       | integer        | not null, indexed, foreign key |
| `user_id2`       | integer        | not null, indexed, foreign key |
| `status`         | string         | not null                       |
| `created_at`     | datetime       | not null                       |
| `updated_at`     | datetime       | not null                       |

DB Validations:
- index on [user_id1, user_id2] pair
- check constraint to validate user_id1 < user_id2
- status IN ('pending_user1', 'pending_user2', 'connected')

Custom associations were required due to the nature of the single table. 

```Ruby 
def connections
  Connection.where("(user_id1 = ? OR user_id2 = ?) AND status = 'connected'", self.id, self.id)  
end

def connected_users
  users = connections.map do |connection|
    if connection.user_id1 == self.id
      connection.user_id2
    else
      connection.user_id1
    end
  end

  User.where("id IN (?)", users)
end
```
### Dropdowns and Modals

Dropdowns and modals enlisted a lot of reused code, so they were exported into individual components that passed out information depending on the name of the modal or dropdown being triggered. Modal rendering is handled via the Redux State.

- modal slice of state

```javascript
ui: {
  modal: modalName/false
},
```

- updateModal action

```javscript
export const updateModal = (modalName, post) => ({
  type: 'UPDATE_MODAL',
  modalName,
  post
});
```

- ui reducer (modal action handler)

```javascript 
const UIReducer = (state = _defaultUi, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_MODAL:
      const modal = state.modal;
      let newState = Object.assign({}, state);
      if (modal) {
        newState['modal'] = false;
      } else {
        newState['modal'] = action.modalName;
        if (action.post) {
          newState['post'] = action.post;
        } else {
          delete newState['post'];
        }
      }
      return newState;
    default:
      return state;
  }
}
```

- sample call to modal component 

```javascript
<i className="fas fa-pencil-alt" onClick={() => this.props.updateModal('EditAboutMe')}></i>
```

- modal component

```javascript 
const Modal = (props) => {

  let modal;
  let {name, ...otherProps} = props;

  switch (props.name) {
    case "ContactInfo":
      modal = <ContactInfoModal {...otherProps}/>;
      break;
    case "EditProfileIntro":
      modal = <EditProfileIntroModal {...otherProps}/>;
      break;
    case "ProfilePhoto":
      modal = <ProfilePhotoModal {...otherProps}/>;
      break;
    case "EditAboutMe":
      modal = <EditAboutMeModal {...otherProps}/>;
      break;
    case 'DeletePhoto':
      modal = <DeletePhotoModal {...otherProps}/>
      break;
    case 'NewPost':
      modal = <NewPostModal {...otherProps}/>;
      break;
    case 'EditPost':
      modal = <EditPostModal {...otherProps}/>;
      break;
    case 'DeletePost':
      modal = <DeletePostModal {...otherProps}/>
      break;
  }

  return (
    <div>
      <div className="modal-background" onClick={props.updateModal}>
        {modal}
      </div>
    </div>
  )
}
```

- EditAboutMeModal Component 

```javascript
class EditAboutMeModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAboutMe = this.updateAboutMe.bind(this);
  }

  updateAboutMe (e) {
    this.setState({
      aboutMe: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.updateUser(this.state);
    this.props.toggleAboutMe();
    this.props.updateModal();
  }

  render () {
    return (
      <div className="modal-box edit-profile-intro-modal-box edit-about-me-modal-box" onClick={(e) => e.stopPropagation()}>
        <header>
          <h4>Edit summary</h4>
          <i className="fas fa-times" onClick={this.props.updateModal}></i>
        </header>
        <form>
          <label>Description
            <textarea cols="30" rows="10" value={this.state.aboutMe} onChange={this.updateAboutMe}></textarea>
          </label>
          <footer>
            <button onClick={this.handleSubmit}>Save</button>
          </footer>
        </form>
      </div>
    )
  }
}

export default EditAboutMeModal;
```
