import React from 'react';
import cx from 'classnames';

export const Button = ({
  title,
  target = undefined,
  url,
  className,
}) => (
  <a
    href={url}
    target={target}
    className={cx('button', 'paper-raise', className)}
  >
    {title}
  </a>
);

export default Button;