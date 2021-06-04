import { Button, Container, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { withRouter } from "react-router";
import { UserContext } from "../../../../contexts/UserContext";
export default withRouter(function ResetSuccess(props) {
  const userContext = useContext(UserContext);

  return (
    <Container
      align="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={"xs"}
    >
      <Typography>Password Successfully Reset</Typography>
      <Button
        color="primary"
        onClick={async () => {
          const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${userContext.user._id}`,
            { credentials: "include" }
          );
          const json = await res.json();
          props.history.push(`/${json.handle}`);
        }}
      >
        Go To Wishlist
      </Button>
    </Container>
  );
});
