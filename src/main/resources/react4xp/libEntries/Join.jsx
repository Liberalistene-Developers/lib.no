import React from 'react';
import cx from 'classnames';

import Button from './Button';

import Image from '../shared/Image';

export const Join = ({
  message,
  image = null,
  url,
  buttonText,
  className,
}) => (
  <div className="join-container">
    <div className={cx('join', 'middle')}>
      <div className="join-front">
        <div className="join-front-content">
          <Image image={image} />
          { message && (
            <div className="join-text"  dangerouslySetInnerHTML={{ __html: message }} />
          )}
        </div>
      </div>
      <div className="join-back">
        <div className="join-back-content middle">
          <Button
            className="light"
            title={buttonText} 
            url={url}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Join;