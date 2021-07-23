import React from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../posts/post_item';

const ProfileActivity = (props) => {
  console.log(props);
  return <section className="activity">
    <h3>Activity</h3>
    {props.post ? 
    <PostItem user={props.user} profile={true} post={props.post}/>
    :
    <p>{"No posts :("}</p>}
    <footer>
      <Link to={`/users/${props.userId}/activity`}>See all activity</Link>
    </footer>
  </section>
}

export default ProfileActivity;