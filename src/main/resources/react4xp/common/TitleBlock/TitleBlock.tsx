import cx from 'classnames';

import {Image} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import type {ImageData} from '@common/types';

/**
 * Represents a piece of the title with individual styling
 */
interface TitlePiece {
  /** Title text for this piece */
  title?: string;
  /** CSS color class for this title piece */
  titleColor?: string;
  /** If true, removes spacing after this title piece */
  titleNoSpace?: boolean;
}

/**
 * Props for the TitleBlock component
 */
interface TitleBlockProps {
  /** Heading tag to use for the title */
  Tag?: 'h1' | 'h2' | 'h3';
  /** Background image data */
  image?: ImageData;
  /** Text content position - 'left', 'center', or 'right' */
  position?: 'left' | 'center' | 'right';
  /** Array of title pieces for multi-colored titles */
  title?: TitlePiece[];
  /** Title width class - '', 'half', 'quart', or 'treequart' */
  titleClassName?: '' | 'half' | 'quart' | 'treequart';
  /** Overlay effect class */
  overlay?: string;
  /** Introduction text (HTML) or boolean flag */
  ingress?: string | boolean;
  /** CSS color class for the ingress text */
  ingressColor?: string;
}

/**
 * TitleBlock component displays a full-width image with overlaid title content.
 *
 * Similar to ImageBlock but specifically focused on title display. Creates a hero-style
 * block with a background image and positioned title/ingress overlay. Supports
 * multi-colored title pieces and flexible positioning.
 *
 * @example
 * ```tsx
 * <TitleBlock
 *   Tag="h1"
 *   image={{url: '/images/header.jpg', alternativeText: 'Header'}}
 *   position="center"
 *   title={[
 *     {title: 'Our', titleColor: 'text-white'},
 *     {title: 'Mission', titleColor: 'text-primary-700'}
 *   ]}
 *   ingress="<p>Building a better future</p>"
 * />
 * ```
 */
export const TitleBlock = ({
  Tag = 'h1',
  image,
  position = 'right',
  title = [],
  titleClassName = '',
  overlay = '',
  ingress = '',
  ingressColor = 'standard'
}: TitleBlockProps) => {
  return (
    <div className="image-block">
      <Image image={image} className="full" />

      {(title || ingress) && (
        <div className={cx('content', position, overlay)}>
          {((title && title.length > 0) || ingress) && (
            <div className="image-block-text">
              {title && title.length > 0 && (
                <div className="title">
                  <Tag className={cx(titleClassName)}>
                    {title.map(({title: titleText, titleColor, titleNoSpace}, index) => (
                      <span key={titleText || `titlespan-${index}`} className={cx(titleColor, {nospace: titleNoSpace})}>
                        {titleText}
                      </span>
                    ))}
                  </Tag>
                </div>
              )}
              {ingress && typeof ingress === 'string' && (
                <SafeHtml html={ingress} className={cx('ingress', ingressColor)} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
