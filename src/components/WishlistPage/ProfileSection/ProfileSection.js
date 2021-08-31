import React, { useState, useEffect, useContext } from "react";
import "./ProfileSection.css";
import EditableProfileInfo from "./EditbableProfileInfo/EditableProfileInfo.js";
import EditableCoverImage from "./EditableCoverImage/EditableCoverImage";
import UpdateProfileInfo from "./UpdateProfileInfo/UpdateProfileInfo";
import { UserContext } from "../../../contexts/UserContext";
import { WishlistContext } from "../../../contexts/WishlistContext";
import { useParams } from "react-router-dom";
import { fetchPatchImage, fetchPatchJson } from "../../../scripts/fetchHelper";
import { Redirect } from "react-router-dom";
import ActivateAccount from "./ActivateAccount";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import Twitter from "@material-ui/icons/Twitter";
const handleRoute = "/api/aliases?handle_lowercased=";
/**
 * Renders a <ProfileSection /> component
 * @param  props
 * @param  props.info
 * @param  props.isAuth
 */
function ProfileSection(props) {
  const {
    getWishlistAndParse,
    getWishlistAndParseWithArgs,
    setWishlist,
    wishlist,
  } = useContext(WishlistContext);

  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [wishlistName, setWishlistName] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);
  const [aliasId, setAliasId] = useState(null);
  const [handle, setHandle] = useState(null);
  const [aliasName, setAliasName] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const { user: currentUser } = useContext(UserContext);
  let { alias: aliasPath } = useParams();

  useEffect(() => {
    if (props.info) {
      setIsAuth(
        currentUser ? currentUser.aliases.includes(props.info._id) : false
      );
      setWishlistId(props.info.wishlists[0]?._id || null);
      setProfilePicture(
        props.info.profileImage ||
          `${process.env.REACT_APP_BASE_URL}/data/images/profileImages/default_profileimage.png`
      );
      setHandle(props.info.handle);
      setAliasName(props.info.aliasName);
      setAliasId(props.info._id);
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
  const handleUpdateHandle = async (handle) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/aliases/${aliasId}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({ handle }),
      headers,
    }).then(async (res) => {
      setHandle(handle);
      props.history.push("/" + handle);
    });
  };
  const handleUpdateAliasName = async (aliasName) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    await fetch(`${process.env.REACT_APP_BASE_URL}/api/aliases/${aliasId}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({ aliasName }),
      headers,
    }).then(async (res) => {
      setAliasName(aliasName);
    });
  };

  const handleUpdateCoverImage = (image) => {
    fetchPatchImage(
      image,
      "image",
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      async () => {
        setWishlist(await getWishlistAndParseWithArgs());
      }
    );
  };
  const handleUpdateWishlistMessage = async (wishlistMessage) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({ wishlistMessage }),
        headers,
      }
    ).then(async (res) => {
      setWishlist(await getWishlistAndParseWithArgs());
    });
  };

  const handleUpdateWishlistName = async (wishlistName) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({ wishlistName }),
        headers,
      }
    ).then(async (res) => {
      setWishlist(await getWishlistAndParseWithArgs());
    });
  };

  return (
    <div className="profile_section">
      {handle && aliasPath.toLowerCase() !== handle.toLowerCase() && (
        <Redirect to={`/${handle}`} />
      )}

      <EditableCoverImage
        coverPicUrl={
          wishlist.coverImage ||
          `${process.env.REACT_APP_BASE_URL}/data/images/coverImages/default_coverimage2.jpg`
        }
        handleUpdateCoverImage={handleUpdateCoverImage}
        isAuth={isAuth}
      ></EditableCoverImage>

      <EditableProfileInfo
        wishlistName={
          wishlist.wishlistName || (isAuth ? "Name your wishlist" : "")
        }
        handle={handle}
        wishlistMessage={
          wishlist.wishlistMessage ||
          (isAuth ? "Write a message for your fans." : "")
        }
        profilePic={profilePicture}
        handleUpdateProfilePicture={handleUpdateProfilePicture}
        handleUpdateWishlistMessage={handleUpdateWishlistMessage}
        isAuth={isAuth}
      ></EditableProfileInfo>
      {props.isAuth && (
        <Button
          style={{
            // float: "right",
            position: "absolute",
            bottom: "0vw",
            right: "1vw",
          }}
          color="primary"
          endIcon={<Twitter />}
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              `https://twitter.com/intent/tweet?text=You%20can%20buy%20a%20gift%20for%20me%20off%20my%20wishlist%20on%20@WishTender.%0a%0aWishlist%3A%20https%3A//www.wishtender.com/${handle}`,
              "popup",
              "width=600,height=600"
            );
          }}
        >
          Share
        </Button>
      )}
      {isAuth && (
        <div className="edit_profile_button__container">
          <UpdateProfileInfo
            wishlistName={
              wishlist.wishlistName || (isAuth ? "Name your wishlist" : "")
            }
            aliasName={aliasName}
            handleUpdateAliasName={handleUpdateAliasName}
            handleUpdateWishlistMessage={handleUpdateWishlistMessage}
            handle={handle}
            handleUpdateWishlistName={handleUpdateWishlistName}
            handleUpdateHandle={handleUpdateHandle}
            handleCheckHandleAvailability={handleCheckHandleAvailability}
            isAuth={isAuth}
          ></UpdateProfileInfo>
        </div>
      )}
      {isAuth && !props.info.activated && !!wishlist.wishlistItems.length && (
        <ActivateAccount finish={!!currentUser.stripeAccountInfo} />
      )}
    </div>
  );
}

export default withRouter(ProfileSection);
