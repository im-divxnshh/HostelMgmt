import React from 'react';

const TextFile = () => {
  const text = `This is a simple text file.
  It contains some sample text data.
  You can replace it with anything you like!`;

  return (
    <div>
      <h1>Simple Text File</h1>
      <pre>{text}</pre> {/* The <pre> tag preserves formatting */}
    </div>
  );
};

export default TextFile;
