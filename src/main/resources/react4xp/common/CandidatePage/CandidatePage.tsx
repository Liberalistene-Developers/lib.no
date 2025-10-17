import {FancyCandidateImage} from '@common/Candidate/FancyCandidateImage';
import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';


export interface CandidatePageProps {
  fancyImage?: boolean;
  artImage?: ImageData | null;
  image?: ImageData | null;
  ingress?: string;
  description?: string;
  title?: string;
  position?: string;
}

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
