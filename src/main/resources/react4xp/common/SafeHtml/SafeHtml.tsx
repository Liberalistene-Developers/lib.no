import {type FC} from 'react';
import cx from 'classnames';

/**
 * Props for the SafeHtml component
 */
interface SafeHtmlProps {
  /** HTML string to render (should already be processed by XP's processHtml) */
  html: string;
  /** Additional CSS classes to apply to the wrapper element */
  className?: string;
  /** HTML element type to use as wrapper. Defaults to 'div' */
  as?: 'div' | 'span' | 'p' | 'dd' | 'dt' | 'li' | 'section' | 'article' | 'aside' | 'header' | 'footer';
}

/**
 * Component for rendering HTML content from CMS that has been processed server-side
 *
 * **Important:** This component expects HTML that has already been sanitized and processed
 * by Enonic XP's `processHtml()` function in the processor layer. It does NOT perform
 * sanitization itself - that happens server-side before React receives the data.
 *
 * **Security Model:**
 * - HTML sanitization happens in processors using XP's `processHtml()`
 * - `processHtml()` handles XSS protection, image URL conversion, and macro processing
 * - This component is a simple rendering wrapper for already-safe HTML
 * - SSR-compatible (no client-side DOM dependencies)
 *
 * **Architecture:**
 * Following React4xp v6 principles, data processing happens in Layer 1 (Processors),
 * not Layer 3 (Components). Processors use `processHtml()` from `/react4xp/utils/html`.
 *
 * @example
 * ```tsx
 * // Processor (Layer 1) - HTML is sanitized here
 * import {processHtml} from '/react4xp/utils/html';
 * export const myProcessor = ({component}) => ({
 *   text: processHtml(config.text) // ← Sanitization happens here
 * });
 *
 * // Component (Layer 3) - Just renders safe HTML
 * <SafeHtml html={text} />
 *
 * // With custom wrapper element
 * <SafeHtml html={description} as="section" />
 *
 * // With additional CSS classes
 * <SafeHtml html={content} className="article-content" />
 * ```
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
