import React from 'react';
import './CoverImage.css';

/**
 * Renders a <CoverImage /> component
 * @param  props
 * @param  props.coverPicUrl
 **/
export default function CoverImage(props) {
  return (
    <div className="cover_image">
      <img alt="cover" src={props.coverPicUrl} />
    </div>
  );
}
