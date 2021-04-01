import React from "react";
import CoverImage from "../CoverImage/CoverImage";
import PhotoSizeSelectActual from "@material-ui/icons/PhotoSizeSelectActual";
import "./EditableCoverImage.css";
import SelectCropUpdateImage from "../SelectCropUpdateImage/SelectCropUpdateImage";
import StyledIconButton from "../../../common/StyledIconButton/StyledIconButton";


/**
 * Renders a <EditableCoverImage /> component
 * @param  props
 * @param  props.handleUpdateCoverImage
 * @param  props.aspect ex 2 or 2/1
 * @param  props.isAuth
 **/
export default function EditableCoverImage(props) {
  const aspect = { w: 10, h: 3 };
  return (
    <div className="editable-cover-image">
      <CoverImage coverPicUrl={props.coverPicUrl} size="medium"></CoverImage>
      {props.isAuth && (
        <div className="edit-image-button__container">
          <SelectCropUpdateImage
            handleUpdateImage={props.handleUpdateCoverImage}
            // ariaLabel="Update Cover Image"
            // size="medium"
            cropShape="rect"
            aspect={aspect.w / aspect.h}
            finalImageDimensions={{
              width: aspect.w * 60,
              height: aspect.h * 60,
            }}
          >
                        <StyledIconButton             ariaLabel="Update Cover Image"
            size="medium">
            <PhotoSizeSelectActual />
            </StyledIconButton>
          </SelectCropUpdateImage>
        </div>
      )}
    </div>
  );
}
