import type {FC, ReactNode} from 'react';

import type {ImageData} from '../types';
import { getImageAlt } from '@utils/image.client';
import { SafeHtml } from '../SafeHtml/SafeHtml';

interface CardProps {
  children?: ReactNode;
  image?: ImageData | null;
  noIngress?: boolean;
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Card component for displaying content with optional image
 */
export const Card: FC<CardProps> = ({
  children,
  image = null,
  noIngress = false,
  title = '',
  text = '',
  url = ''
}) => {
  return (
    <div className="bg-white rounded-[3px] w-full shadow-[0px_1px_40px_3px_rgba(74,16,74,0.11)]">
      {image && (
        <div>
          <a href={url} title={title}>
            <img
              src={image.url}
              alt={getImageAlt(image, title)}
              className="rounded-t-[3px] w-full"
            />
          </a>
          {children}
        </div>
      )}
      <div className="p-[15px]">
        <h3 className="text-primary-700 text-[24px] leading-[29px] mb-[5px] -mt-5">
          <a href={url} title={title}>{title}</a>
        </h3>
        {!noIngress && text && (
          <SafeHtml html={text} />
        )}
      </div>
    </div>
  );
};
