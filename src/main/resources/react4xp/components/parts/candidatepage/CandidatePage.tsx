import * as React from 'react';

import {FancyCandidateImage} from '../candidateblock/FancyCandidateImage';
import {Image} from '../../common/Image';

interface ImageType {
  url?: string;
}

interface CandidatePageProps {
  fancyImage?: boolean;
  artImage?: ImageType | null;
  image?: ImageType | null;
  ingress?: string;
  description?: string;
  title?: string;
  position?: string;
}

export const CandidatePage: React.FC<CandidatePageProps> = ({
  fancyImage = true,
  artImage = null,
  image = null,
  ingress = '',
  description = '',
  title = '',
  position = ''
}) => (
  <div className="candidate-page-wrapper">
    {(fancyImage && (
      <FancyCandidateImage
        artImage={artImage}
        image={image}
        title={title}
        subTitle={position}
      />
    )) || (
      <div className="candidate-page-header">
        <Image image={image} className="candidate-page-image" />
        {title && (
          <div className="candidate-page-header-title">
            <h1>{title}</h1>
            <h2>{position}</h2>
          </div>
        )}
      </div>
    )}
    <div className="page-content">
      {ingress && (
        <div className="ingress rich-text" dangerouslySetInnerHTML={{__html: ingress}} />
      )}

      {description && (
        <div className="candidate-page-description" dangerouslySetInnerHTML={{__html: description}} />
      )}
    </div>
  </div>
);
