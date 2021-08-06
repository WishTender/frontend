import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import themeStyles from "../themeStyles";
import styles from "../components/Onboard/SignUp/styles";
import theme from "../theme";

import { Box } from "@material-ui/core";
import useScreenSize from "../hooks/useScreenSize";

export default withStyles(styles)(function TestLayout(props) {
  const classes = themeStyles(props);
  const [long, setLong] = useState(false);

  const screenSize = useScreenSize({
    breakpoints: {
      mobile: 0,
      xs: 450,
      sm: 700,
    },
    useStandard: false,
  });

  const LongContent = () => (
    <>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br> doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br> doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br> doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
      doodie<br></br>
    </>
  );

  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        background: "red",
        minHeight: "inherit",
      }}
    >
      doodie<br></br>
      <button
        onClick={() => {
          setLong(!long);
        }}
      >
        toggle
      </button>
      {long && <LongContent />}
    </Box>
  );
});
