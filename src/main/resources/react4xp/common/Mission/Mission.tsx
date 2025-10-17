import * as React from 'react';

import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

interface MissionProps {
  description?: string;
  image?: ImageData;
  title?: string;
}

export const Mission: React.FC<MissionProps> = ({
  description,
  image,
  title
}) => {
  return (
    <div className="max-w-fit [&_h3_.image]:inline [&_h3_.image_img]:h-8">
      <div>
        <h3 title={title}><Image image={image} /> {title}</h3>

        {description && (
          <SafeHtml html={description} className="description" />
        )}
      </div>
    </div>
  );
};
