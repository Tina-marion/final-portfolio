import React from 'react';

const Image = ({ src, ...props }) => {
  // Temporary simple image component without Sharp processing
  if (!src) return null;
  
  // For now, just return a regular img tag
  // You can replace with proper image URLs or static imports
  return <img src={src} alt="" {...props} />;
};

export default Image;
