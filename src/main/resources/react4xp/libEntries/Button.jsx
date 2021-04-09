import React from 'react';
import cx from 'classnames';

export const Button = ({
  title,
  target = undefined,
  url,
  className,
  onClick,
}) => (
  <a
    href={url}
    target={target}
    className={cx('button', 'paper-raise', className)}
    onClick={onClick}
  >
    {title}
  </a>
);

export default (props) => <Button {...props} />;