import {type FC} from 'react';
import cx from 'classnames';

import type {ButtonProps} from './ButtonProps';

/**
 * Button component with support for different variants and both button/link rendering
 *
 * Renders as a `<button>` element when onClick is provided without URL,
 * or as an `<a>` element when URL is provided.
 *
 * Supports two variants controlled by className:
 * - **Default (dark):** Primary color background with hover effects
 * - **Light:** Light background with primary color text
 *
 * @example
 * ```tsx
 * // Button element with onClick
 * <Button title="Click me" onClick={handleClick} />
 *
 * // Link element
 * <Button title="Learn more" url="/about" target="_blank" />
 *
 * // Light variant
 * <Button title="Light button" url="/page" className="light" />
 * ```
 */
export const Button: FC<ButtonProps> = ({
  title,
  target,
  url,
  className,
  onClick
}) => {
  // Determine if this is a light variant
  const isLight = className?.includes('light');

  // Base classes for both button and link
  const baseClasses = cx(
    // Base styles
    'inline-block rounded min-w-[124px] my-5 mx-auto px-[18px] py-[18px]',
    'text-center uppercase no-underline',
    'border border-[#ccc]',
    'relative cursor-pointer',
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
  );

  // Use button element if onClick is provided without URL
  if (onClick && !url) {
    return (
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          className={baseClasses}
          onClick={onClick}
        >
          {title}
        </button>
      </div>
    );
  }

  // Use anchor element for links
  return (
    <div className="flex w-full items-center justify-center">
      <a
        href={url}
        target={target}
        className={baseClasses}
        onClick={onClick}
        rel="noreferrer"
      >
        {title}
      </a>
    </div>
  );
};
