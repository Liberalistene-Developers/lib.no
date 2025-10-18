import {type FC} from 'react';

import {ImageBlock} from '@common/ImageBlock/ImageBlock';
import {PersonListItem} from '@common/PersonListItem/PersonListItem';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

import { type ImageData } from '@common/Image/Image';

/**
 * Represents a board member
 */
interface BoardMember {
  /** Unique member identifier */
  itemId?: string;
  /** Member's profile image */
  image?: ImageData;
  /** Member's role/title */
  role?: string;
  /** Member's name */
  name?: string;
}

/**
 * Props for the Group component
 */
export interface GroupProps {
  /** Board member image size - 'small', 'medium', or 'large' */
  imagesize?: string;
  /** If true, displays member images as round */
  imagetype?: boolean;
  /** CSS color class for header text */
  headerColor?: string;
  /** Header position - 'left', 'center', or 'right' */
  headerPosition?: string;
  /** If true, displays short description in the header image */
  ingressInImage?: boolean;
  /** Group title */
  title?: string;
  /** If true, displays title in the header image */
  titleInImage?: boolean;
  /** Header background image */
  image?: ImageData;
  /** Label for the information section */
  informationLabel?: string;
  /** Short description/ingress (HTML) */
  shortDescription?: string;
  /** Detailed description (HTML) */
  description?: string;
  /** Array of board members to display */
  board?: BoardMember[];
}

/**
 * Group component displays group information with board members.
 *
 * Renders a flexible group page with optional header image, title, descriptions,
 * and board member list. The first board member is displayed prominently in the
 * center, with remaining members in a two-column grid below. Title and ingress
 * can be positioned either in the header image or below it.
 *
 * @example
 * ```tsx
 * <Group
 *   title="Oslo Chapter"
 *   image={{url: '/images/oslo.jpg', alternativeText: 'Oslo'}}
 *   titleInImage={true}
 *   shortDescription="<p>Our Oslo chapter</p>"
 *   board={[
 *     {name: 'Jane Doe', role: 'Chair', image: {url: '/jane.jpg'}},
 *     {name: 'John Smith', role: 'Secretary', image: {url: '/john.jpg'}}
 *   ]}
 * />
 * ```
 */
export const Group: FC<GroupProps> = ({
  imagesize = 'medium',
  imagetype = true,
  headerColor,
  headerPosition,
  ingressInImage = true,
  title = '',
  titleInImage = true,
  image,
  informationLabel,
  shortDescription,
  description = '',
  board
}) => (
  <div>
    {image && (
      <ImageBlock
        title={titleInImage && title ? [{title, titleColor: headerColor}] : []}
        image={image}
        ingress={(ingressInImage && shortDescription) || ''}
        position={headerPosition as 'left' | 'center' | 'right'}
      />
    )}

    <div className="max-w-[1200px] mx-auto pt-5 pb-5">
      {(!titleInImage || !image) && title && (
        <h1>{title}</h1>
      )}

      {(!ingressInImage || !image) && shortDescription && (
        <SafeHtml html={shortDescription} />
      )}

      {description && (
        <div>
          {informationLabel && (
            <h2 className="mb-5">{informationLabel}</h2>
          )}

          <SafeHtml html={description} className="flex pt-5" />
        </div>
      )}

      {board && board.length > 0
        ? (
          <div>
            <div className="flex justify-center">
              {board.slice(0, 1).map((item) => (
                <PersonListItem
                  key={item.itemId}
                  item={item}
                  imageSize={imagesize as 'small' | 'medium' | 'large'}
                  imageType={(imagetype && 'round') || ''}
                />
              ))}
            </div>
            {board.length > 1 && (
              <div className="flex flex-wrap [&_.list-item.person]:w-1/2">
                {board.slice(1).map((item) => (
                  <PersonListItem
                    key={item.itemId}
                    item={item}
                    imageSize={imagesize as 'small' | 'medium' | 'large'}
                    imageType={(imagetype && 'round') || ''}
                  />
                ))}
              </div>
            )}
          </div>
        )
        : null
      }
    </div>
  </div>
);
