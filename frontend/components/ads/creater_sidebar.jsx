import React from 'react';

const CreaterSidebar = (props) => (
  <div className="creater-sidebar">
    <p>BarkedIn Creater</p>
    <img src={window.createrProfPic}/>
    <p>Melissa Flynn</p>
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

export default CreaterSidebar;