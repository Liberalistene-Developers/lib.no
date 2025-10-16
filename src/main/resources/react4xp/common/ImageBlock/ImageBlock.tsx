import { FC } from 'react';
import cx from 'classnames';

import { Image } from '../Image/Image';
import { SafeHtml } from '../SafeHtml/SafeHtml';
import type { ImageData } from '../types';

interface TitleItem {
  title?: string;
  titleColor?: string;
  titleNoSpace?: boolean;
}

export interface ImageBlockProps {
  Tag?: 'h1' | 'h2' | 'h3';
  image?: ImageData;
  position?: 'left' | 'center' | 'right';
  title?: TitleItem[];
  titleClassName?: '' | 'half' | 'quart' | 'treequart';
  overlay?: string;
  ingress?: string | boolean;
  ingressColor?: string;
  text?: 'dark' | 'light';
}

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
