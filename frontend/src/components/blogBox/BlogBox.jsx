// src/components/blogBox/BlogBox.jsx

import React from 'react';
import './blogBox.scss';

const BlogBox = ({ title, content }) => {
  return (
    <div className="blogBox">
      <h3 className="blogTitle">{title}</h3>
      <p className="blogContent">{content}</p>
    </div>
  );
};

export default BlogBox;
