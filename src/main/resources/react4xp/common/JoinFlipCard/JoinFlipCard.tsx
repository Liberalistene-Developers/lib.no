import {type FC} from 'react';
import cx from 'classnames';

import {Button} from '@common/Button/Button';
import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the JoinFlipCard component
 */
export interface JoinFlipCardProps {
  /** Front side message text (HTML) */
  message?: string;
  /** Back side message text (HTML) */
  backMessage?: string;
  /** Front side image */
  image?: ImageData | null;
  /** CTA button URL on back side */
  url?: string;
  /** CTA button text on back side */
  buttonText?: string;
  /** Front side layout - 'row' (side-by-side) or 'column' (stacked) */
  frontPlacement?: string;
}

/**
 * JoinFlipCard component displays an interactive 3D flip card on hover.
 *
 * Renders a card that flips on hover using CSS 3D transforms (rotateX). The
 * front side displays an image and message in either row or column layout.
 * The back side shows a message and call-to-action button. Fixed at 300px
 * height and 600px width (responsive on mobile). Uses perspective transforms
 * for smooth 3D flip animation.
 *
 * @example
 * ```tsx
 * <JoinFlipCard
 *   message="<h2>Join our movement</h2>"
 *   backMessage="<p>Be part of the change</p>"
 *   image={{url: '/join.jpg', alternativeText: 'Join'}}
 *   url="/membership"
 *   buttonText="Become a Member"
 *   frontPlacement="row"
 * />
 * ```
 */
export const JoinFlipCard: FC<JoinFlipCardProps> = ({
  message,
  backMessage,
  image = null,
  url,
  buttonText,
  frontPlacement
}) => (
  <div className="relative h-[300px] w-full my-[60px]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[600px] max-w-full h-[300px] mobile:w-full group">
      <div className="w-full h-full overflow-hidden [backface-visibility:hidden] absolute transition-transform duration-[600ms] linear rounded-[3px] [transform:perspective(600px)_rotateX(0deg)] group-hover:[transform:perspective(600px)_rotateX(180deg)] text-white">
        <div className={cx(
          'bg-primary-700 h-full w-full flex justify-center items-center',
          frontPlacement === 'row' && 'flex-row gap-x-10',
          frontPlacement === 'column' && 'flex-col gap-y-5'
        )}>
          {image && (
            <div className={cx(
              'flex items-center justify-center',
              frontPlacement === 'row' && 'h-full max-w-[50%]',
              frontPlacement === 'column' && 'mt-5 h-[70%]'
            )}>
              <Image
                image={image}
                imageClassName={cx(
                  frontPlacement === 'row' && 'h-[calc(100%-50px)]',
                  frontPlacement === 'column' && 'h-full'
                )}
              />
            </div>
          )}
          {message && (
            <SafeHtml
              html={message}
              className={cx(
                'flex items-center',
                frontPlacement === 'row' && 'h-full justify-center max-w-[50%]',
                frontPlacement === 'column' && image ? 'items-start h-1/3 -mt-5' : 'h-full'
              )}
            />
          )}
        </div>
      </div>
      <div className="bg-primary-700 w-full h-full overflow-hidden [backface-visibility:hidden] absolute transition-transform duration-[600ms] linear rounded-[3px] [transform:perspective(600px)_rotateX(-180deg)] group-hover:[transform:perspective(600px)_rotateX(0deg)]">
        <div className="text-[#2c3e50] text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {backMessage && (
            <SafeHtml html={backMessage} className="text-button-100" />
          )}
          <Button
            className="light"
            title={buttonText}
            url={url}
          />
        </div>
      </div>
    </div>
  </div>
);
