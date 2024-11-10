// src/components/widget/Widget.jsx

import React from "react";
import "./widget.scss";

const Widget = ({ title, excerpt, onReadMore }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="blogTitle">{title}</span>
        {/* <span className="blogExcerpt">{excerpt}</span> */}
        <span className="readMore" onClick={onReadMore}>Read more</span>
      </div>
      <div className="right">
        {/* Add any icons or visual indicators if needed, or leave empty */}
      </div>
    </div>
  );
};

export default Widget;
