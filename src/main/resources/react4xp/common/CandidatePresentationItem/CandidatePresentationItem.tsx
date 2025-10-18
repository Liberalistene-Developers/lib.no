import {type FC} from 'react';
import cx from 'classnames';

import { Image } from '/react4xp/common/Image/Image';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';
import type { ImageData } from '/react4xp/common/types';

/**
 * Props for the CandidatePresentationItem component
 */
interface CandidatePresentationItemProps {
  /** CSS class name ('main' for highlighted/larger layout) */
  className?: string;
  /** Candidate's profile image data */
  image?: ImageData;
  /** Candidate's name */
  name?: string;
  /** Geographic location (e.g., city, region) */
  place?: string;
  /** Candidate's position/role */
  position?: string;
  /** Introduction text (HTML) */
  ingress?: string;
  /** Full description text (HTML) */
  description?: string;
  /** Text prefix to display before the candidate's name */
  preText?: string;
  /** URL to the candidate's detail page */
  url?: string;
}

/**
 * CandidatePresentationItem component displays a single candidate in presentation format.
 *
 * Provides two layout modes:
 * - Standard: Compact card with image, name, and position
 * - Main (className="main"): Larger horizontal layout with additional details
 *
 * The component shows/hides certain elements based on the layout mode using
 * Tailwind CSS classes.
 *
 * @example
 * ```tsx
 * <CandidatePresentationItem
 *   className="main"
 *   image={{url: '/candidate.jpg', alternativeText: 'Jane Doe'}}
 *   name="Jane Doe"
 *   position="Party Leader"
 *   place="Oslo"
 *   preText="Top candidate:"
 *   ingress="<p>Leading the change...</p>"
 *   url="/candidates/jane-doe"
 * />
 * ```
 */
export const CandidatePresentationItem: FC<CandidatePresentationItemProps> = ({
  className,
  image,
  name = '',
  place = '',
  position = '',
  ingress = '',
  description = '',
  preText = '',
  url
}) => {
  const subTitle: string[] = [];

  if (position) {
    subTitle.push(position);
  }

  if (place) {
    subTitle.push(place);
  }

  return (
    <div className={cx(
      'flex flex-col bg-background-300 w-[calc(33%-10px)] mobile:w-full',
      '[&_.image]:max-h-[500px] [&_.image]:w-full [&_.image_img]:w-full [&_.image_img]:max-w-full [&_.image_img]:h-[200px] [&_.image_img]:object-cover',
      {
        'w-full flex-row-reverse shrink-0 mobile:flex-col': className === 'main',
        '[&_.image]:w-[calc(66%+12px)] [&_.image_img]:h-[500px] mobile:[&_.image]:w-full mobile:[&_.image]:h-[200px] mobile:[&_.image_img]:w-full mobile:[&_.image_img]:h-[200px]': className === 'main'
      }
    )}>
      <Image image={image} title={name} className="image" url={url} />
      <div className={cx(
        'flex flex-col items-center justify-center pb-[15px]',
        '[&_.title_h3]:text-[30px]',
        '[&_.sub-title]:text-primary-700 [&_.sub-title]:leading-[22px] [&_.sub-title]:text-[18px]',
        '[&_.pre-text]:hidden',
        '[&_.ingress]:hidden',
        '[&_.description]:hidden',
        {
          'w-[calc(33%-10px)] items-start gap-y-[15px] m-[15px] mobile:w-full mobile:items-center': className === 'main',
          '[&_.title_h3]:leading-[1]': className === 'main',
          '[&_.pre-text]:block': className === 'main',
          '[&_.ingress]:block mobile:[&_.ingress]:hidden': className === 'main'
        }
      )}>
        <div className="title">
          <h3>
            {preText && (
              <span className="pre-text">{preText}&nbsp;</span>
            )}
            {name}
          </h3>
        </div>
        {(place || position) && (
          <div className="sub-title">
            {subTitle.join(', ')}
          </div>
        )}

        {ingress && (
          <SafeHtml html={ingress} className="ingress" />
        )}

        {description && (
          <SafeHtml html={description} className="description" />
        )}
      </div>
    </div>
  );
};
