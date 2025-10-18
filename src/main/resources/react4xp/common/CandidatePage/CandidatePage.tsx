import {FancyCandidateImage} from '@common/Candidate/FancyCandidateImage';
import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the CandidatePage component
 */
export interface CandidatePageProps {
  /** Whether to use the fancy image layout */
  fancyImage?: boolean;
  /** Decorative art/background image for fancy layout */
  artImage?: ImageData | null;
  /** Candidate's profile image */
  image?: ImageData | null;
  /** Introduction text (HTML) */
  ingress?: string;
  /** Full description/biography (HTML) */
  description?: string;
  /** Candidate's name */
  title?: string;
  /** Candidate's position/role */
  position?: string;
}

/**
 * CandidatePage component displays a full candidate detail page.
 *
 * Provides two layout options: a fancy stylized header with layered images
 * and trapezoid design, or a simpler header with image and text side-by-side.
 * Includes the candidate's introduction and full description.
 *
 * @example
 * ```tsx
 * <CandidatePage
 *   fancyImage={true}
 *   artImage={{url: '/art/bg.jpg', alternativeText: 'Background'}}
 *   image={{url: '/candidate.jpg', alternativeText: 'John Doe'}}
 *   title="John Doe"
 *   position="Party Leader"
 *   ingress="<p>Leading the change...</p>"
 *   description="<p>Full biography...</p>"
 * />
 * ```
 */
export const CandidatePage = ({
  fancyImage = true,
  artImage = null,
  image = null,
  ingress = '',
  description = '',
  title = '',
  position = ''
}: CandidatePageProps) => (
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
        <SafeHtml html={ingress} className="ingress" />
      )}

      {description && (
        <SafeHtml html={description} className="candidate-page-description" />
      )}
    </div>
  </div>
);
