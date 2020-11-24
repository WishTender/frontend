import React from "react";
import "./ProfileSection.css";

function ProfilePicture(props) {
  return (
    <div className="profile_picture container">
      <img
        style={{ backgroundImage: `url(${props.profilePicUrl})` }}
        className="profile_picture picture"
      />
    </div>
  );
}
function ProfileSection(props) {
  return (
    <div className="profile_section">
      <div className="banner_image">
        <img src={props.bannerPicUrl}></img>
      </div>
      <div className="info">
        <div className="container flex">
          <ProfilePicture profilePicUrl={props.profilePicUrl}></ProfilePicture>
          <div className="container name">
            <div className="wishlist_name">{props.firstName}'s Wishlist</div>
            <div className="user_name">{props.displayName}</div>
          </div>
        </div>
        <div className="profile_message">{props.profileMessage}</div>
      </div>
    </div>
  );
}

export default ProfileSection;
