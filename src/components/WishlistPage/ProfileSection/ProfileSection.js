import React, { useState, useEffect, useContext } from "react";
import "./ProfileSection.css";
import EditableProfileInfo from "./EditbableProfileInfo/EditableProfileInfo.js";
import EditableCoverImage from "./EditableCoverImage/EditableCoverImage";
import UpdateProfileInfo from "./UpdateProfileInfo/UpdateProfileInfo";
import { UserContext } from "../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { fetchPatchImage, fetchPatchJson } from "../../../scripts/fetchHelper";
import { Redirect } from "react-router-dom";
import ActivateAccount from "./ActivateAccount";
const handleRoute = "/api/aliases?handle_lowercased=";

/**
 * Renders a <ProfileSection /> component
 * @param  props
 * @param  props.info
 * @param  props.isAuth
 */
function ProfileSection(props) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [wishlistName, setWishlistName] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);
  const [aliasId, setAliasId] = useState(null);
  const [handle, setHandle] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const { user: currentUser } = useContext(UserContext);
  let { alias: aliasPath } = useParams();

  useEffect(() => {
    if (props.info) {
      setCoverImage(
        props.info.wishlists[0]?.coverImage ||
          "/data/images/coverImages/default_coverimage2.jpg"
      );
      setWishlistName(
        props.info.wishlists[0]?.wishlistName || "Name your wishlist"
      );
      setWishlistMessage(
        props.info.wishlists[0]?.wishlistMessage ||
          "Write a message for your fans."
      );
      setWishlistId(props.info.wishlists[0]?._id || null);
      setProfilePicture(
        props.info.profileImage ||
          "/data/images/profileImages/default_profileImage.png"
      );
      setHandle(props.info.handle);
      setAliasId(props.info._id);
      setIsAuth(
        currentUser ? currentUser.aliases.includes(props.info._id) : false
      );
    }
  }, [props.info, currentUser]);

  const handleUpdateProfilePicture = (image) => {
    fetchPatchImage(
      image,
      "image",
      `${process.env.REACT_APP_BASE_URL}/api/aliases/${aliasId}`,
      setProfilePicture
    );
  };

  const handleCheckHandleAvailability = async (handle) => {
    const available = await fetch(
      `${process.env.REACT_APP_BASE_URL}${handleRoute}${handle.toLowerCase()}`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        return res.status === 204 ? true : false;
      })
      .catch((err) => {
        console.log(`couldn't check handle availability: ${err}`);
      });
    return available;
  };
  const handleUpdateHandle = (handle) => {
    fetchPatchJson(
      { handle },
      `${process.env.REACT_APP_BASE_URL}/api/aliases/${aliasId}`,
      () => {
        setHandle(handle);
      }
    );
  };

  const handleUpdateCoverImage = (image) => {
    fetchPatchImage(
      image,
      "image",
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      setCoverImage
    );
  };
  const handleUpdateWishlistMessage = (wishlistMessage) => {
    fetchPatchJson(
      { wishlistMessage },
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      () => {
        setWishlistMessage(wishlistMessage);
      }
    );
  };

  const handleUpdateWishlistName = (wishlistName) => {
    fetchPatchJson(
      { wishlistName },
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      () => {
        setWishlistName(wishlistName);
      }
    );
  };

  return (
    <div className="profile_section">
      {handle && aliasPath.toLowerCase() !== handle.toLowerCase() && (
        <Redirect to={`/${handle}`} />
      )}

      <EditableCoverImage
        coverPicUrl={coverImage}
        handleUpdateCoverImage={handleUpdateCoverImage}
        isAuth={isAuth}
      ></EditableCoverImage>

      <EditableProfileInfo
        wishlistName={wishlistName}
        handle={handle}
        wishlistMessage={wishlistMessage}
        profilePic={profilePicture}
        handleUpdateProfilePicture={handleUpdateProfilePicture}
        handleUpdateWishlistMessage={handleUpdateWishlistMessage}
        isAuth={isAuth}
      ></EditableProfileInfo>
      {isAuth && (
        <div className="edit_profile_button__container">
          <UpdateProfileInfo
            wishlistName={wishlistName}
            handleUpdateWishlistMessage={handleUpdateWishlistMessage}
            handle={handle}
            handleUpdateWishlistName={handleUpdateWishlistName}
            handleUpdateHandle={handleUpdateHandle}
            handleCheckHandleAvailability={handleCheckHandleAvailability}
            isAuth={isAuth}
          ></UpdateProfileInfo>
        </div>
      )}
      {isAuth && !props.info.activated && <ActivateAccount />}
    </div>
  );
}

export default ProfileSection;
