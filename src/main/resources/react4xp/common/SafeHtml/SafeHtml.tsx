import {type FC, useMemo} from 'react';
import cx from 'classnames';
import DOMPurify from 'dompurify';

/**
 * Props for the SafeHtml component
 */
interface SafeHtmlProps {
  /** HTML string to sanitize and render */
  html: string;
  /** Additional CSS classes to apply to the wrapper element */
  className?: string;
  /** HTML element type to use as wrapper. Defaults to 'div' */
  as?: 'div' | 'span' | 'p' | 'dd' | 'dt' | 'li' | 'section' | 'article' | 'aside' | 'header' | 'footer';
  /**
   * Optional DOMPurify configuration to customize sanitization rules
   * Merged with default configuration that allows most safe HTML tags and attributes commonly used in CMS content
   */
  sanitizeConfig?: DOMPurify.Config;
}

/**
 * Component for safely rendering HTML content from CMS with XSS protection
 *
 * Uses DOMPurify to sanitize HTML before rendering, preventing XSS attacks while preserving
 * safe HTML formatting. Memoized for performance - only re-sanitizes when HTML or config changes.
 *
 * **Default allowed tags:**
 * - Formatting: p, div, span, strong, em, u, b, i, br
 * - Lists: ul, ol, li
 * - Headers: h1-h6
 * - Blocks: blockquote, pre, code
 * - Tables: table, thead, tbody, tr, td, th
 * - Definition lists: dl, dt, dd
 * - Other: img, hr, sup, sub
 *
 * **Default allowed attributes:**
 * - Links: href, target, rel
 * - Images: src, alt, title
 * - Styling: class, id, width, height, style
 *
 * **Security:**
 * - Data attributes are blocked by default (ALLOW_DATA_ATTR: false)
 * - All script tags and event handlers are removed
 * - Dangerous protocols (javascript:, data:) are blocked
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SafeHtml html={content.htmlText} />
 *
 * // With custom wrapper element
 * <SafeHtml html={content.description} as="section" />
 *
 * // With additional CSS classes
 * <SafeHtml html={content.body} className="article-content" />
 *
 * // With custom sanitization config (allow data attributes)
 * <SafeHtml
 *   html={content.html}
 *   sanitizeConfig={{ ALLOW_DATA_ATTR: true }}
 * />
 * ```
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
