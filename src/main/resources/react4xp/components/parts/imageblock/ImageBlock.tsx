import * as React from 'react';
import cx from 'classnames';

import {Image} from '../../common/Image';

interface TitleItem {
  title?: string;
  titleColor?: string;
  titleNoSpace?: boolean;
}

interface ImageType {
  url?: string;
}

interface ImageBlockProps {
  Tag?: 'h1' | 'h2' | 'h3';
  image?: ImageType;
  position?: 'left' | 'center' | 'right';
  title?: TitleItem[];
  titleClassName?: '' | 'half' | 'quart' | 'treequart';
  overlay?: string;
  ingress?: string | boolean;
  ingressColor?: string;
  text?: 'dark' | 'light';
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  Tag = 'h1',
  image,
  position = 'right',
  title = [],
  titleClassName = '',
  overlay = '',
  ingress = '',
  ingressColor = 'standard'
}) => {
  const isPurpleOverlay = overlay?.includes('purple');
  const isCenter = position === 'center';
  const isLeft = position === 'left';
  const isRight = position === 'right';

  return (
    <div className="flex relative h-[458px] mobile:h-max [&_.full]:w-full [&_.full>img]:w-full [&_.full>img]:object-cover [&_.full>img]:h-full mobile:[&_.full>img]:h-[50vw]">
      <Image image={image} className="full" />

      {(title || ingress) && (
        <div className={cx(
          'absolute z-10 w-full h-full flex',
          isCenter && 'justify-center items-center',
          isLeft && 'mr-5 w-[calc(100%-40px)]',
          isRight && 'ml-5 w-[calc(100%-40px)]',
          overlay && isPurpleOverlay && isCenter && 'bg-gradient-to-r from-[rgba(74,15,57,0)] via-[rgba(74,16,74,0.87)] to-[rgba(74,16,57,0)] [background-position:10%_0%,25%_0%,70%_0%,100%_0%]',
          overlay && isPurpleOverlay && isLeft && 'bg-[linear-gradient(90deg,rgba(74,16,74,0.87)_20.89%,rgba(74,16,57,0)_100%)] mr-10',
          overlay && isPurpleOverlay && isRight && 'bg-[linear-gradient(270deg,rgba(74,16,74,0.87)_20.89%,rgba(74,16,57,0)_100%)] ml-10',
          'mobile:h-[50vw]'
        )}>
          {((title && title.length > 0) || ingress) && (
            <div className={cx(
              'max-w-[50%] absolute top-1/2 -translate-y-1/2',
              isCenter && 'left-1/2 -translate-x-1/2',
              isLeft && 'left-[10%]',
              isRight && 'right-[10%]',
              'max-[834px]:max-w-[60%]',
              'mobile:max-w-full'
            )}>
              {title && title.length > 0 && (
                <div className={cx(
                  overlay && isPurpleOverlay && '[&.normal_h1]:text-white [&.normal_h1]:shadow-[2px_2px_var(--lib-color-primary-100)]'
                )}>
                  <Tag className={cx(
                    'text-[100px] font-extrabold leading-[120px]',
                    'max-[834px]:text-[80px] max-[834px]:leading-[120%]',
                    'mobile:text-[38px] mobile:leading-[120%] mobile:[&>span]:block mobile:[&>span]:whitespace-nowrap mobile:[&>span]:text-ellipsis',
                    titleClassName === 'half' && 'mobile:text-[25px]',
                    titleClassName === 'quart' && 'mobile:text-[12.5px]',
                    titleClassName === 'treequart' && 'mobile:text-[37.5px]',
                    '[&>span:not(:first-child):not(.nospace)]:before:content-[" "]',
                    'mobile:[&>span.nospace]:before:content-["-"]',
                    overlay && isPurpleOverlay ? '[&>span.purple]:!text-white [&>span.light]:!text-white [&_.yellow]:text-purple-anchor [&_.white]:text-primary-700' : '[&_.purple]:text-primary-700 [&_.yellow]:text-purple-anchor [&_.light]:text-button-100 [&_.white]:text-primary-700'
                  )}>
                    {title.map(({title: titleText, titleColor, titleNoSpace}, index) => (
                      <span key={titleText || `titlespan-${index}`} className={cx(titleColor, {nospace: titleNoSpace})}>
                        {titleText}
                      </span>
                    ))}
                  </Tag>
                </div>
              )}
              {ingress && typeof ingress === 'string' && (
                <div className={cx(
                  'text-[35px] font-medium leading-[42px] mt-[10px] [&>p]:mt-0 [&>p]:mb-0',
                  'mobile:text-[30px] mobile:text-ellipsis mobile:whitespace-nowrap',
                  overlay && isPurpleOverlay ? 'text-white' : cx(
                    ingressColor === 'purple' && 'text-primary-700 [&_.normal]:text-button-100',
                    ingressColor === 'yellow' && 'text-purple-anchor [&_.normal]:text-primary-700',
                    ingressColor === 'light' && 'text-white',
                    ingressColor === 'standard' && 'text-button-100',
                    '[&_.purple]:text-primary-700',
                    '[&_.yellow]:text-purple-anchor',
                    '[&_.light]:text-button-100',
                    '[&_.white]:text-primary-700'
                  )
                )} dangerouslySetInnerHTML={{__html: ingress}} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
