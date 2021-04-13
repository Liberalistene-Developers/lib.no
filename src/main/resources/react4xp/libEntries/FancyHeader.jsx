import React from 'react';

import { Image } from '../shared/Image';

export const FancyHeader = ({
  title = '',
  effect, 
  image,
}) => (
  <div class="orgHeader-grid-container">
    <div class="ogHeader-grid-item">
      <div class="headertitleWrapper">
        <div class="headertitle">
          <h1>{title}</h1>
        </div>
        <Image image={effect} />
      </div>
    </div>
    <Image image={image} className="orgHeader-grid-item" />
  </div>
);

export default (props) => <FancyHeader {...props} />;