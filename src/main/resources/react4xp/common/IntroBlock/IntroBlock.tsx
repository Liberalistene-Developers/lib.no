import {type FC} from 'react';

import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

interface IntroBlockProps {
  caption?: string;
  description?: string;
  image?: ImageData;
  title?: string;
}

export const IntroBlock: FC<IntroBlockProps> = ({
  caption,
  description,
  image,
  title
}) => (
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
        <SafeHtml html={description} className="mt-[15px]" />
      )}
    </div>
  </div>
);
