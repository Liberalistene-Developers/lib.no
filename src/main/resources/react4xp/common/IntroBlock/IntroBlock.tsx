import {type FC} from 'react';

import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the IntroBlock component
 */
interface IntroBlockProps {
  /** Image caption text */
  caption?: string;
  /** Description text (HTML) */
  description?: string;
  /** Image data */
  image?: ImageData;
  /** Block title */
  title?: string;
}

/**
 * IntroBlock component displays an introduction section with image and text.
 *
 * Creates a two-column layout with an image (and caption) on the left and
 * title/description on the right. On mobile, switches to a reverse column layout.
 * Used for introductory content sections or feature highlights.
 *
 * @example
 * ```tsx
 * <IntroBlock
 *   image={{url: '/images/intro.jpg', alternativeText: 'Introduction'}}
 *   caption="Photo from our event"
 *   title="Welcome"
 *   description="<p>Learn more about our mission...</p>"
 * />
 * ```
 */
export const IntroBlock: FC<IntroBlockProps> = ({
  caption,
  description,
  image,
  title
}) => (
  <div className="flex flex-row py-[15px] gap-x-5 [&>div]:w-[calc(50%-10px)] [&_img]:w-full mobile:flex-col-reverse mobile:gap-y-5 mobile:[&>div]:w-full">
    <div>
      <Image image={image} />
      <span className="caption">{caption}</span>
    </div>

    <div>
      {title && (
        <h2 title={title}>{title}</h2>
      )}

      {description && (
        <SafeHtml html={description} className="mt-[15px]" />
      )}
    </div>
  </div>
);
