import React from 'react';

// class EditPostDropdown extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       showDropdown: false,
//       // post: this.props.post
//     }
//     this.dropdownDisplay = this.dropdownDisplay.bind(this);
//     this.dropdownHide = this.dropdownHide.bind(this);
//   }

  // componentWillUnmount() {
  //   window.removeEventListener('click', this.dropdownHide);
  // }

  // componentDidUpdate() {

  //   setTimeout(() => {
  //     if (this.state.showDropdown) {
  //       window.addEventListener('click', this.dropdownHide)
  //     } else {
  //       window.removeEventListener('click', this.dropdownHide)
  //     }
  //   }, 0)

  // }

  // dropdownDisplay(e) {
  //   e.preventDefault();
  //   this.setState({
  //     showDropdown: true
  //   })
  // }

  // dropdownHide(e) {
  //   e.preventDefault();
  //   this.setState({
  //     showDropdown: false
  //   })
  // }

//   render () {
//     return <div>
//       <p id="edit-post-dropdown-parent" onClick={this.dropdownDisplay}>...</p>
//       {this.state.showDropdown ? (
//         <div id="edit-post-dropdown" onClick={(e) => e.stopPropagation()}>
//           <ul>
//             <li onClick={(e) => {this.dropdownHide(e); this.props.updateModal('EditPost', this.props.post)}}>
//               <i className="fas fa-pencil-alt"></i>
//               <p>Edit Post</p>
//             </li>
//             <li onClick={(e) => { this.dropdownHide(e); this.props.updateModal('DeletePost', this.props.post) }}>
//               <i className="fas fa-trash-alt"></i>
//               <p>Delete Post</p>
//             </li>
//           </ul>
//         </div>
//       ) : ''
//       }
//     </div>
//   }

// }

const EditPostDropdown = (props) => (
  <div>
    <p id="edit-post-dropdown-parent" onClick={props.dropdownDisplay}>...</p>
    {props.showDropdown ? (
      <div id="edit-post-dropdown" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li onClick={(e) => { props.dropdownHide(e); props.updateModal('EditPost', props.post) }}>
            <i className="fas fa-pencil-alt"></i>
            <p>Edit Post</p>
          </li>
          <li onClick={(e) => { dropdownHide(e); props.updateModal('DeletePost', props.post) }}>
            <i className="fas fa-trash-alt"></i>
            <p>Delete Post</p>
          </li>
        </ul>
      </div>
    ) : ''
    }
  </div>
)

export default EditPostDropdown;