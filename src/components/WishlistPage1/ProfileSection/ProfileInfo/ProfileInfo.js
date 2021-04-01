import React from 'react';
import ProfilePicture from '../../ProfilePicture/ProfilePicture.js';
import './ProfileInfo.css';

//toggle this--- in real life this would be session
const userLoggedIn = true;
/**
 * Renders a <ProfileInfo /> component
 * @param  props
 * @param  props.firstName
 * @param  props.displayName
 * @param  props.profilePic
 * @param  props.profileMessage
 */
export default function ProfileInfo(props) {
  return (
    <div className="info">
      <div className="container flex">
        <div className="profile_picture__container">
          <ProfilePicture profilePic={props.profilePic}></ProfilePicture>
        </div>
        <div className="container name">
          <div className="wishlist_name">{props.firstName}'s Wishlist</div>
          <div className="user_name">{props.displayName}</div>
        </div>
      </div>
      <div className="profile_message">{props.profileMessage}</div>
    </div>
  );
}
