import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActivity = (props) => {
  return <section className="activity">
    <h3>Activity</h3>

    <footer>
      <Link to={`/users/${props.userId}/activity`}>See all activity</Link>
    </footer>
  </section>
}

export default ProfileActivity;