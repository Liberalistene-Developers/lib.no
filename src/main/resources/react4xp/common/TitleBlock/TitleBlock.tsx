import cx from 'classnames';

import {Image} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import type {ImageData} from '@common/types';


interface TitlePiece {
  title?: string;
  titleColor?: string;
  titleNoSpace?: boolean;
}

interface TitleBlockProps {
  Tag?: 'h1' | 'h2' | 'h3';
  image?: ImageData;
  position?: 'left' | 'center' | 'right';
  title?: TitlePiece[];
  titleClassName?: '' | 'half' | 'quart' | 'treequart';
  overlay?: string;
  ingress?: string | boolean;
  ingressColor?: string;
}

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
