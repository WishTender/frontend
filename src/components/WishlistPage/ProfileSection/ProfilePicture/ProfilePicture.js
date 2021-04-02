import React from 'react';
import './ProfilePicture.css';
import defaultAvatar from './default-avatar.png';
export default function ProfilePicture(props) {
  return (
    <div className="profile_picture">
      <img src={props.profilePic || defaultAvatar} className="" alt="profile" />
    </div>
  );
}
