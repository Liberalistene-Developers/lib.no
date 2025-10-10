import * as React from 'react';

import {Image, type ImageData} from '/react4xp/common/Image/Image';


interface IntroBlockProps {
  caption?: string;
  description?: string;
  image?: ImageData;
  title?: string;
}

export const IntroBlockPart: React.FC<IntroBlockProps> = ({
  caption,
  description,
  image,
  title
}) => {
  return (
    <div className="flex flex-row py-[15px] gap-x-5 [&>div]:w-[calc(50%-10px)] [&_img]:w-full mobile:flex-col-reverse mobile:gap-y-5 mobile:[&>div]:w-full">
      <div>
        <Image image={image} />
        <span className="caption">{caption}</span>
      </div>

      <div>
        {title && (
          <h2 title={title}>{title}</h2>
        )}

        {description && (
          <div dangerouslySetInnerHTML={{__html: description}} className="mt-[15px]" />
        )}
      </div>
    </div>
  );
};
