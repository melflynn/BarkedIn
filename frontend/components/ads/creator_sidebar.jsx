import React from 'react';

const CreatorSidebar = (props) => (
  <div className="creator-sidebar">
    <header>
      <p>BarkedIn Creator</p>
      <img src={window.creatorProfPic}/>
      <p>Melissa Flynn</p>
    </header>
    <ul>
      <li>
        <a href="https://github.com/melflynn">Github</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/melissa-flynn-372b84b7/">LinkedIn</a>
      </li>
      <li>
        <a>AngelList</a>
      </li>
    </ul>
  </div>
)

export default CreatorSidebar;