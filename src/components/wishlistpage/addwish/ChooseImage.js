import React, { useState } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import "./ProductImages.css";
import { Typography } from "@material-ui/core";
import EasyCrop from "../../common/Crop/ReactEasyCrop/EasyCrop";
import { useTheme } from "@material-ui/core/styles";

/**
 * Renders a <ChooseImage /> component
 * @param  props
 * @param  props.images
 * @param  props.onCropComplete
 **/
function ChooseImage(props) {
  const [displayImage, setDisplayImage] = useState(0);
  const theme = useTheme();

  // useEffect(() => {
  //   if (!displayImage) setDisplayImage(0);
  // }, [props]);

  function move(num) {
    let newDisplayImage = displayImage + num;
    if (newDisplayImage > props.images.length - 1 && num > 0) {
      newDisplayImage = 0;
    }
    if (newDisplayImage < 0 && num < 0) {
      newDisplayImage = props.images.length - 1;
    }
    setDisplayImage(newDisplayImage);
  }
  const handleSetCrop = (crop) => {
    props.onImageChosen({
      crop: crop.croppedAreaPixels,
      url: props.images[displayImage],
    });
  };

  return (
    <div style={{ display: "inherit", gap: "inherit" }}>
      <Typography>Choose & Position Image</Typography>
      <div style={{ position: "relative" }}>
        {/* <EasyCrop slider={false} cropShape="rect" imgSrc={props.images[displayImage]}></EasyCrop> */}
        <EasyCrop
          aspect="1"
          cropShape="rect"
          slider={false}
          onCropComplete={handleSetCrop}
          imgSrc={props.images[displayImage]}
        ></EasyCrop>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            background: theme.palette.primary.main + "80",
          }}
        >
          <IconButton onClick={() => move(-1)}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={() => move(1)}>
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChooseImage;
