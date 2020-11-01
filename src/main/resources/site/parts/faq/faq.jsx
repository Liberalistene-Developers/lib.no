import React from 'react';

export default ({ question, answer }) => (
  <div itemscope="itemscope" itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h2 itemprop="name">{question}</h2>
    <div itemscope="itemscope" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text" dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  </div>
);
