import { FC } from 'react';
import cx from 'classnames';

import { Image } from '../Image/Image';
import type { ImageData } from '../types';

interface CandidatePresentationItemProps {
  className?: string;
  image?: ImageData;
  name?: string;
  place?: string;
  position?: string;
  ingress?: string;
  description?: string;
  preText?: string;
  url?: string;
}

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
          <div className="ingress rich-text" dangerouslySetInnerHTML={{ __html: ingress }} />
        )}

        {description && (
          <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </div>
    </div>
  );
};
