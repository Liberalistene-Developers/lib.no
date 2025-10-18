import {type FC} from 'react';

import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the Mission component
 */
interface MissionProps {
  /** Mission description text (HTML) */
  description?: string;
  /** Mission icon/image (displayed inline with title) */
  image?: ImageData;
  /** Mission title */
  title?: string;
}

/**
 * Mission component displays a single mission statement with icon and description.
 *
 * Shows a mission with an inline icon next to the title (H3), followed by
 * a description. The icon is styled to be small (h-8) and inline with the text.
 * Used within MissionsBlock to display multiple party missions.
 *
 * @example
 * ```tsx
 * <Mission
 *   image={{url: '/icons/freedom.svg', alternativeText: 'Freedom icon'}}
 *   title="Individual Freedom"
 *   description="<p>We believe in personal liberty...</p>"
 * />
 * ```
 */
export const Mission: FC<MissionProps> = ({
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
