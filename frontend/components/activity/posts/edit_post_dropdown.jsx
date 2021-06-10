import React from 'react';

class EditPostDropdown extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDropdown: false
    }
    this.dropdownDisplay = this.dropdownDisplay.bind(this);
    this.dropdownHide = this.dropdownHide.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.dropdownHide);
  }

  componentDidUpdate() {

    setTimeout(() => {
      if (this.state.showDropdown) {
        window.addEventListener('click', this.dropdownHide)
      } else {
        window.removeEventListener('click', this.dropdownHide)
      }
    }, 0)

  }

  dropdownDisplay(e) {
    e.preventDefault();
    this.setState({
      showDropdown: true
    })
  }

  dropdownHide(e) {
    e.preventDefault();
    this.setState({
      showDropdown: false
    })
  }

  render () {
    return <div>
      <p id="edit-post-dropdown-parent" onClick={this.dropdownDisplay}>...</p>
      {this.state.showDropdown ? (
        <div id="edit-post-dropdown" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <i className="fas fa-pencil-alt"></i>
              <p>Edit Post</p>
            </li>
            <li>
              <i className="fas fa-trash-alt"></i>
              <p>Delete Post</p>
            </li>
          </ul>
        </div>
      ) : ''
      }
    </div>
  }

}

export default EditPostDropdown;