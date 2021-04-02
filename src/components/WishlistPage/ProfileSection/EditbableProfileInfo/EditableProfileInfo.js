import React, { useState } from "react";
import "./EditableProfileInfo.css";
import EditableProfilePicture from "./EditableProfilePicture/EditableProfilePicture";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import UpdateMessageForm from "./UpdateMessageForm/UpdateMessageForm";

function EditIconButton(props) {
  return (
    <IconButton onClick={props.onClick} size="small" aria-label="edit">
      <EditIcon />
    </IconButton>
  );
}

/**
 * Renders a <EditableProfileInfo /> component
 * @param  props
 * @param  props.wishlistName
 * @param  props.handle
 * @param  props.profilePic
 * @param  props.wishlistMessage
 * @param  props.handleUpdateProfilePicture
 * @param  props.handleUpdateWishlistMessage
 * @param  props.isAuth
 */
export default function EditableProfileInfo(props) {
  const [editMessageVisible, setEditMessageVisible] = useState(false);

  return (
    <div className="info">
      <div className="container flex">
        <div className="profile_picture__container">
          <EditableProfilePicture
            handleUpdateProfilePicture={props.handleUpdateProfilePicture}
            profilePic={props.profilePic}
            isAuth={props.isAuth}
          ></EditableProfilePicture>
        </div>
        <div className="container name">
          <div className="wishlist_name">{props.wishlistName}</div>
          <div className="user_name">@{props.handle}</div>
        </div>
      </div>
      <div className="profile_message">
        {/* The user is <b>{true ? props.handle : 'not'}</b> logged in. */}
        {editMessageVisible ? (
          <UpdateMessageForm
            isAuth={props.isAuth}
            handleUpdateWishlistMessage={props.handleUpdateWishlistMessage}
            wishlistMessage={props.wishlistMessage}
            onClose={() => {
              setEditMessageVisible(false);
            }}
          ></UpdateMessageForm>
        ) : (
          <>
            {props.wishlistMessage}
            {props.isAuth && (
              <EditIconButton
                onClick={() => {
                  setEditMessageVisible(true);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
