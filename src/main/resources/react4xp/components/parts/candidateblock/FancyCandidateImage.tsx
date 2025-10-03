import * as React from 'react';

interface ImageType {
  url?: string;
  displayName?: string;
  alternativeText?: string;
}

interface FancyCandidateImageProps {
  artImage?: ImageType;
  image?: ImageType;
  title?: string;
  subTitle?: string;
}

export const FancyCandidateImage: React.FC<FancyCandidateImageProps> = ({
  artImage,
  image,
  title,
  subTitle
}) => (
  <div className="fancy-candidate-image-wrapper">
    {(artImage || image) && (
      <figure className="fancy-candidate-image-figure">
        <a>
          {artImage && (
            <img className="fancy-candidate-image-art" src={artImage.url} alt={artImage.alternativeText || artImage.displayName || (artImage.url && artImage.url.split('?')[0].split('/').pop()) || ''} />
          )}

          {image && (
            <img className="fancy-candidate-image-image" src={image.url} alt={image.alternativeText || image.displayName || (image.url && image.url.split('?')[0].split('/').pop()) || ''} />
          )}
        </a>
      </figure>
    )}

    {title && (
      <div className="fancy-candidate-image-title">
        <h1>{title}</h1>
      </div>
    )}

    {subTitle && (
      <div className="trapezoid">
        <h2 className="trapezoid-text">{subTitle}</h2>
      </div>
    )}
  </div>
);
