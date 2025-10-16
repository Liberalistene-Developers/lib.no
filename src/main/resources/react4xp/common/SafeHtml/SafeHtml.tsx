import { FC } from 'react';
import cx from 'classnames';

interface SafeHtmlProps {
  html: string;
  className?: string;
  as?: 'div' | 'span' | 'p';
}

/**
 * Component for safely rendering HTML content from CMS
 * Note: Content from Enonic XP is generally trusted, but this provides
 * a centralized place for any sanitization if needed in the future
 */
export const SafeHtml: FC<SafeHtmlProps> = ({
  html,
  className = '',
  as: Component = 'div'
}) => {
  return (
    <Component
      className={cx('rich-text', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
