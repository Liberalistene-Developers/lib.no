import * as React from 'react';

import {Image} from '../../shared/Image';

interface ImageType {
  url?: string;
}

interface MissionProps {
  description?: string;
  image?: ImageType;
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
          <div dangerouslySetInnerHTML={{__html: description}} className="description" />
        )}
      </div>
    </div>
  );
};
