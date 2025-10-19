import {type FC} from 'react';
import cx from 'classnames';

import { Image } from '/react4xp/common/Image/Image';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';
import type { ImageData } from '/react4xp/common/types';

/**
 * Represents a piece of the title with individual styling
 */
interface TitleItem {
  /** Title text for this piece */
  title?: string;
  /** CSS color class for this title piece */
  titleColor?: string;
  /** If true, removes spacing after this title piece */
  titleNoSpace?: boolean;
}

/**
 * Props for the ImageBlock component
 */
export interface ImageBlockProps {
  /** Heading tag to use for the title */
  Tag?: 'h1' | 'h2' | 'h3';
  /** Background image data */
  image?: ImageData;
  /** Text content position - 'left', 'center', or 'right' */
  position?: 'left' | 'center' | 'right';
  /** Array of title pieces for multi-colored titles */
  title?: TitleItem[];
  /** Title width class - '', 'half', 'quart', or 'treequart' */
  titleClassName?: '' | 'half' | 'quart' | 'treequart';
  /** Overlay effect class */
  overlay?: string;
  /** Introduction text (HTML) or boolean flag */
  ingress?: string | boolean;
  /** CSS color class for the ingress text */
  ingressColor?: string;
  /** Text color theme - 'dark' or 'light' (currently unused) */
  text?: 'dark' | 'light';
}

/**
 * ImageBlock component displays a full-width image with overlaid text content.
 *
 * Creates a hero-style block with a background image and positioned text overlay.
 * Supports multi-colored title pieces and flexible positioning. Used for creating
 * visually striking content sections with background imagery.
 *
 * @example
 * ```tsx
 * <ImageBlock
 *   Tag="h1"
 *   image={{url: '/images/hero.jpg', alternativeText: 'Hero'}}
 *   position="center"
 *   title={[
 *     {title: 'Welcome', titleColor: 'text-white'},
 *     {title: 'to our party', titleColor: 'text-primary-700'}
 *   ]}
 *   ingress="<p>Join us today</p>"
 *   overlay="dark"
 * />
 * ```
 */
export const ImageBlock: FC<ImageBlockProps> = ({
  Tag = 'h1',
  image,
  position = 'right',
  title = [],
  titleClassName = '',
  overlay = '',
  ingress = '',
  ingressColor = 'standard'
}) => {
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
