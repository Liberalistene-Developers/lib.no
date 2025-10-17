import type {FC} from 'react';
import {Image, type ImageData} from '/react4xp/common/Image/Image';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';
import cx from 'classnames';

interface TitleItem {
  title: string;
  titleColor: string;
}

interface LocalBlockProps {
  Tag?: 'h1' | 'h2' | 'h3';
  image?: ImageData;
  title?: TitleItem[];
  position?: string;
  ingress?: string;
  ingressColor?: string;
  overlay?: string;
  titleClassName?: string;
}

export const LocalBlock: FC<LocalBlockProps> = ({
  Tag = 'h1',
  image,
  title = [],
  position = 'left',
  ingress,
  ingressColor = 'normal',
  overlay,
  titleClassName = 'full'
}) => {
  const positionClasses = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right'
  };

  const ingressColorClasses = {
    normal: 'text-inherit',
    light: 'text-button-100',
    yellow: 'text-accent-400',
    purple: 'text-primary-700'
  };

  return (
    <div className={cx('relative w-full min-h-[300px] flex items-center', overlay)}>
      {image && (
        <div className="absolute inset-0">
          <Image
            image={image}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={cx(
        'relative z-10 w-full p-[30px] flex flex-col gap-y-[15px]',
        positionClasses[position as keyof typeof positionClasses] || positionClasses.left
      )}>
        {title && title.length > 0 && (
          <Tag className={cx(
            'font-black leading-[1.2]',
            titleClassName === 'full' ? 'text-[5vw] mobile:text-[9vw]' : 'text-[3vw] mobile:text-[6vw]'
          )}>
            {title.map((item, index) => (
              <span
                key={index}
                className={cx(
                  'block',
                  item.titleColor === 'light' && 'text-button-100',
                  item.titleColor === 'yellow' && 'text-accent-400',
                  item.titleColor === 'purple' && 'text-primary-700',
                  !item.titleColor && 'text-inherit'
                )}
              >
                {item.title}
              </span>
            ))}
          </Tag>
        )}

        {ingress && (
          <SafeHtml
            html={ingress}
            className={cx(
              'text-lg',
              ingressColorClasses[ingressColor as keyof typeof ingressColorClasses] || ingressColorClasses.normal
            )}
          />
        )}
      </div>
    </div>
  );
};
