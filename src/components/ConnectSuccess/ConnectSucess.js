import React, { useEffect, useContext, useState } from "react";
import { Button, Box, Container, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom"; // a comment (can be deleted)
import { UserContext } from "../../contexts/UserContext";

export default function CheckOutSuccess() {
  const userContext = useContext(UserContext);
  const [activatedStatus, setActivatedStatus] = useState("");
  const [alias, setAlias] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/aliases/", {
      credentials: "include",

      method: "GET",
    }).then(async (res) => {
      const json = await res.json();
      setActivatedStatus(json.activated ? "activated" : "");
    });
  }, []);

  const activate = () => {
    fetch(
      process.env.REACT_APP_BASE_URL + "/api/connectAccount/activateConnect",
      {
        credentials: "include",

        method: "PATCH",
      }
    )
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          return setActivatedStatus("success");
        }
        const json = await res.json();
        if (res.status >= 400 && res.status < 500) {
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      alignItems="center"
      style={{ paddingBottom: "17vh", paddingTop: "10vh" }}
    >
      <Container
        maxWidth="xs"
        align="center"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          gap: "3vh",
        }}
      >
        <Box display="flex" justifyContent="center">
          <img
            alt="gift graphic"
            src={
              activatedStatus === ""
                ? "images/piggy_bank_sleep_grey.png"
                : "images/piggy_bank.png"
            }
            // src={"images/piggy_bank.png"}
            style={{ maxHeight: "30vh" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{ gap: "3vh" }}
        >
          {activatedStatus === "activated" || activatedStatus === "success" ? (
            <>
              <Typography variant="h5" component="h1">
                {activatedStatus === "activated"
                  ? "Account Already Set Up"
                  : "Success!"}
              </Typography>
              <Typography>Your account is set up to receive funds.</Typography>
              {alias && <Redirect to={`/${alias}`} />}
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  const res = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${userContext.user._id}`,
                    { credentials: "include" }
                  );
                  const json = await res.json();
                  setAlias(json.handle);
                  setAlias(false);
                }}
              >
                Back To Wishlist
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" component="h1">
                One more step...
              </Typography>
              <Typography>
                You information was successfully submitted.{" "}
              </Typography>
              <Typography>
                Press the button below to activate your account.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={activate}
                style={{ width: "100%" }}
              >
                Activate
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
