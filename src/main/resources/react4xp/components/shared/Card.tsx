import * as React from 'react';

interface ImageData {
  url?: string;
  displayName?: string;
  alternativeText?: string;
}

interface CardProps {
  children?: React.ReactNode;
  image?: ImageData | null;
  noIngress?: boolean;
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Primary Image holder for solution.
 */
export const Card: React.FC<CardProps> = ({
  children,
  image = null,
  noIngress = false,
  title = '',
  text = '',
  url = ''
}) => {
  return (
    <div className="bg-background-700 rounded w-full shadow-[0px_1px_40px_3px_rgba(74,16,74,0.11)]">
      {image && (
        <div>
          <a href={url} title={title}>
            <img
              src={image.url}
              alt={image.alternativeText || image.displayName || title || (image.url && image.url.split('?')[0].split('/').pop())}
              className="rounded-t w-full"
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
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: text }} />
        )}
      </div>
    </div>
  );
};
