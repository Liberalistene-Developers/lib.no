import React from 'react';

export default ({ question, answer }) => (
  <div>
    <h2>{question}</h2>
    <div dangerouslySetInnerHTML={{ __html: answer }} />
  </div>
);
