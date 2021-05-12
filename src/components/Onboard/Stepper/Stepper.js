import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function getSteps() {
  return ["Set Up Account Info", "Set Up Wishlist", "Connect Bank Account"];
}

export default function Onboard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        style={{ position: "absolute", background: "#fbfb98", width: "100%" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
