import * as React from 'react';
import cx from 'classnames';
import type {ComponentProps} from '@enonic/react-components';

import {Image, type ImageType} from '/react4xp/common/Image/Image';


interface TitlePiece {
  title?: string;
  titleColor?: string;
  titleNoSpace?: boolean;
}

interface TitleBlockData {
  Tag?: 'h1' | 'h2' | 'h3';
  image?: ImageType;
  position?: 'left' | 'center' | 'right';
  title?: TitlePiece[];
  titleClassName?: '' | 'half' | 'quart' | 'treequart';
  overlay?: string;
  ingress?: string | boolean;
  ingressColor?: string;
}

export const TitleBlockPart = ({data}: ComponentProps) => {
  const {
    Tag = 'h1',
    image,
    position = 'right',
    title = [],
    titleClassName = '',
    overlay = '',
    ingress = '',
    ingressColor = 'standard'
  } = data as TitleBlockData;

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
                <div
                  className={cx('ingress', ingressColor)}
                  dangerouslySetInnerHTML={{__html: ingress}}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
