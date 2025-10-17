import React, { FC, useMemo } from 'react';
import cx from 'classnames';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
  as?: 'div' | 'span' | 'p' | 'dd' | 'dt' | 'li' | 'section' | 'article' | 'aside' | 'header' | 'footer';
  /**
   * Optional DOMPurify configuration
   * By default, allows most safe HTML tags and attributes commonly used in CMS content
   */
  sanitizeConfig?: DOMPurify.Config;
}

/**
 * Component for safely rendering HTML content from CMS
 * Uses DOMPurify to sanitize HTML and prevent XSS attacks
 *
 * Default configuration allows:
 * - Common formatting tags (p, div, span, strong, em, etc.)
 * - Links with href and target attributes
 * - Images with src and alt attributes
 * - Lists (ul, ol, li)
 * - Tables
 * - Headers (h1-h6)
 */
export const SafeHtml: FC<SafeHtmlProps> = ({
  html,
  className = '',
  as: Component = 'div',
  sanitizeConfig = {}
}) => {
  const sanitizedHtml = useMemo(() => {
    const defaultConfig: DOMPurify.Config = {
      ALLOWED_TAGS: [
        'p', 'div', 'span', 'a', 'strong', 'em', 'u', 'b', 'i',
        'br', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'img', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
        'dl', 'dt', 'dd', 'hr', 'sup', 'sub'
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel', 'src', 'alt', 'title',
        'class', 'id', 'width', 'height', 'style'
      ],
      ALLOW_DATA_ATTR: false,
      ...sanitizeConfig
    };

    return DOMPurify.sanitize(html, defaultConfig);
  }, [html, sanitizeConfig]);

  return (
    <Component
      className={cx('rich-text', className)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
