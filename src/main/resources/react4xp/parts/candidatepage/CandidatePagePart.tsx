import * as React from 'react';

import {FancyCandidateImage} from '../candidateblock/FancyCandidateImage';
import {Image, type ImageData} from '/react4xp/common/Image/Image';


interface CandidatePageProps {
  fancyImage?: boolean;
  artImage?: ImageData | null;
  image?: ImageData | null;
  ingress?: string;
  description?: string;
  title?: string;
  position?: string;
}

export const CandidatePagePart: React.FC<CandidatePageProps> = ({
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
