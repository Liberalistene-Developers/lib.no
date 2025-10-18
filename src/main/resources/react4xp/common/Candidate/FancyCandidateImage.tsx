import { type ImageData } from '@common/Image/Image';

/**
 * Props for the FancyCandidateImage component
 */
interface FancyCandidateImageProps {
  /** Decorative art/background image */
  artImage?: ImageData;
  /** Candidate's profile image */
  image?: ImageData;
  /** Candidate's name (displayed as H1) */
  title?: string;
  /** Candidate's position (displayed as H2) */
  subTitle?: string;
}

/**
 * FancyCandidateImage component displays a candidate with stylized imagery.
 *
 * Creates a visually appealing candidate header with layered images (art background
 * and profile photo) along with the candidate's name and position in a trapezoid design.
 * Used on candidate detail pages for enhanced visual presentation.
 *
 * @example
 * ```tsx
 * <FancyCandidateImage
 *   artImage={{url: '/art/background.jpg', alternativeText: 'Background'}}
 *   image={{url: '/candidates/john.jpg', alternativeText: 'John Doe'}}
 *   title="John Doe"
 *   subTitle="Party Leader"
 * />
 * ```
 */
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
