import { FC } from 'react';
import cx from 'classnames';

import type {ButtonProps} from './ButtonProps';

export const Button: FC<ButtonProps> = ({
  title,
  target,
  url,
  className,
  onClick
}) => {
  // Determine if this is a light variant
  const isLight = className?.includes('light');

  return (
    <div className="flex w-full items-center justify-center">
      <a
        href={url}
        target={target}
        className={cx(
          // Base styles
          'inline-block rounded min-w-[124px] my-5 mx-auto px-[18px] py-[18px]',
          'text-center uppercase no-underline',
          'border border-[#ccc]',
          'relative',
          // Transition
          'transition-all duration-250 ease-out',
          // Default (dark) variant
          !isLight && 'bg-primary-700 text-menu-bg',
          // Light variant
          isLight && 'bg-background-700 text-primary-700',
          // Hover effects for paper-raise
          'hover:border-primary-700 hover:shadow-[0_15px_10px_-10px_rgba(31,31,31,0.5)]',
          isLight && 'hover:border-background-700 hover:shadow-[0_15px_10px_-10px_rgba(255,255,255,0.5)]',
          // Custom classes
          className
        )}
        onClick={onClick}
        rel="noreferrer"
      >
        {title}
      </a>
    </div>
  );
};
