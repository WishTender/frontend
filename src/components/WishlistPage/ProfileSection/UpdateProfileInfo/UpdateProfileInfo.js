import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import StyledDialog from "../../../common/StyledDialog/StyledDialog";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";

/**
 * Renders a <UpdateProfileInfo /> component
 * @param  props
 * @param  props.handleCheckHandleAvailability
 * @param  props.handleUpdateHandle
 */
export default function UpdateProfileInfo(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleDialogOpen}
        color="primary"
        aria-label="update profile info"
        variant="outlined"
      >
        Edit Profile
      </Button>

      {/* Dialog start */}
      <StyledDialog
        open={dialogOpen}
        ariaLabel="crop dialog"
        onClose={handleDialogClose}
      >
        <UpdateProfileForm
          handleCheckHandleAvailability={props.handleCheckHandleAvailability}
          handleUpdateHandle={props.handleUpdateHandle}
          handleUpdateWishlistName={props.handleUpdateWishlistName}
          onClose={handleDialogClose}
          wishlistName={props.wishlistName}
          handle={props.handle}
        ></UpdateProfileForm>
      </StyledDialog>
      {/* Dialog end */}
    </>
  );
}
