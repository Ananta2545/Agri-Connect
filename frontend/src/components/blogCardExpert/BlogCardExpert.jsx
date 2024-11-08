import React from 'react';
import './BlogCardExpert.scss';

const BlogCardExpert = ({ title, onClick }) => {
  return (
    <div className="blog-card" onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default BlogCardExpert;
