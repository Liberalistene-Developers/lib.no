import React from 'react';
import cx from 'classnames';

import Button from './Button';

import Image from '../shared/Image';

export const Join = ({
  message,
  backMessage,
  image = null,
  url,
  buttonText,
  className,
  frontPlacement
}) => (
  <div className="join-container">
    <div className={cx('join', 'middle')}>
      <div className="join-front">
        <div className={cx('join-front-content', frontPlacement)}>
          <Image image={image} />
          { message && (
            <div className="join-front-text"  dangerouslySetInnerHTML={{ __html: message }} />
          )}
        </div>
      </div>
      <div className="join-back">
        <div className="join-back-content middle">
          { backMessage && (
            <div className="join-back-text"  dangerouslySetInnerHTML={{ __html: backMessage }} />
          )}
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