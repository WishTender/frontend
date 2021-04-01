import React from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import "./EditableProfilePicture.css";
import "../../ProfilePicture/ProfilePicture.js";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import SelectCropUpdateImage from "../../SelectCropUpdateImage/SelectCropUpdateImage";
import StyledIconButton from "../../../../common/StyledIconButton/StyledIconButton";

/**
 * Renders a <EditableProfilePicture /> component
 * @param  props
 * @param  props.handleUpdateProfilePicture
 * @param  props.isAuth
 **/
export default function EditableProfilePicture({
  profilePic,
  isAuth,
  handleUpdateProfilePicture,
}) {
  const aspect = { w: 1, h: 1 };

  return (
    <div className="editable_profile_picture__container">
      {isAuth && (
        <div className="update_profile_picture_button__container">
          <SelectCropUpdateImage
            aspect={aspect.w / aspect.h}
            // size="small"
            // ariaLabel="Update Profile Image"
            finalImageDimensions={{
              width: aspect.w * 300,
              height: aspect.h * 300,
            }}
            handleUpdateImage={handleUpdateProfilePicture}
          >
            <StyledIconButton size="small" ariaLabel="Update Profile Image">
              <PhotoCameraIcon></PhotoCameraIcon>
            </StyledIconButton>
          </SelectCropUpdateImage>
        </div>
      )}
      <ProfilePicture profilePic={profilePic}></ProfilePicture>
    </div>
  );
}
