import React from "react";

const ImageBlock = ({ src, alterText }) => (
  <div className="image-block">
    <img src={src} alt={alterText} />
    <p className="description">{alterText}</p>
  </div>
);
export { ImageBlock };
