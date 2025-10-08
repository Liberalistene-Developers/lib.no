import * as React from 'react';
import cx from 'classnames';

import {Image} from '../../common/Image';

interface ImageType {
  url?: string;
}

interface TitleBlockProps {
  image?: ImageType;
  title?: string;
  titleCenter?: string;
  titleColor?: string;
  imageClass?: string;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
  image,
  title = '',
  titleCenter = '',
  titleColor = '',
  imageClass = ''
}) => (
  <>
    <div className="flex h-[458px] flex-row mobile:flex-col mobile:h-auto mobile:gap-y-5">
      <div className={cx(
        'flex flex-col justify-center items-center w-1/3 mobile:w-full',
        titleCenter && 'mx-auto',
        titleColor
      )}>
        <h1 className="font-extrabold text-[100px] leading-[85px] mobile:font-bold mobile:text-[50px] mobile:leading-[60px]">
          {title}
        </h1>
      </div>
      {image && (
        <div className="flex flex-col justify-center items-center w-1/3 mobile:w-full mobile:pl-5">
          <Image
            image={image}
            className={imageClass}
            imageClassName="max-w-full mobile:max-w-[calc(100%-40px)]"
          />
        </div>
      )}
    </div>
  </>
);
