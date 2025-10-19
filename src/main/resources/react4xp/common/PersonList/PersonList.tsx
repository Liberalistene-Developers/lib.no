import {type FC} from 'react';

import {GridItem} from '@common/GridItem/GridItem';
import {Image, type ImageData} from '@common/Image/Image';
import {ListItem} from '@common/ListItem/ListItem';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Represents a person item in the list
 */
interface PersonItem {
  /** Unique identifier for the person */
  itemID?: string;
  /** Person's profile image data */
  image?: ImageData;
  /** Person's name */
  name?: string;
  /** Brief description of the person */
  shortDescription?: string;
  /** URL to the person's detail page */
  url?: string;
}

/**
 * Props for the PersonList component
 */
interface PersonListProps {
  /** Full description text (HTML) */
  description?: string;
  /** Display mode - 'list' or 'grid' */
  displaytype?: string;
  /** Additional CSS class names */
  className?: string;
  /** Size of person images - 'small', 'medium', or 'large' */
  imagesize?: 'small' | 'medium' | 'large';
  /** Whether to use round image style */
  imagetype?: boolean;
  /** Header image for the list */
  image?: ImageData;
  /** Array of person items to display */
  items?: PersonItem[];
  /** Brief introduction text (HTML) */
  shortDescription?: string;
  /** Whether to show images (currently unused) */
  showImage?: boolean;
  /** List title */
  title?: string;
}

/**
 * PersonList component displays a collection of people.
 *
 * Provides flexible display options with either list or grid layout.
 * Includes optional header image, title, and description. Uses ListItem
 * or GridItem internally based on the displaytype prop.
 *
 * @example
 * ```tsx
 * <PersonList
 *   title="Our Team"
 *   displaytype="grid"
 *   imagesize="medium"
 *   imagetype={true}
 *   shortDescription="<p>Meet our team...</p>"
 *   items={teamMembers}
 * />
 * ```
 */
export const PersonList: FC<PersonListProps> = ({
  description,
  displaytype = 'grid',
  imagesize,
  imagetype,
  image,
  shortDescription,
  items = [],
  title
}) => {
  const Item = displaytype === 'list' ? ListItem : GridItem;

  return (
    <div>
      {title && (
        <h2 title={title}>{title}</h2>
      )}

      <Image image={image} />

      {shortDescription && (
        <SafeHtml html={shortDescription} />
      )}

      {description && (
        <SafeHtml html={description} />
      )}

      {items && items.length > 0 && (
        <div className={displaytype === 'list' ? 'flex flex-col' : 'flex flex-row'}>
          {items.map((item) => (
            <Item
              key={item.itemID}
              item={item}
              imageSize={imagesize}
              imageType={(imagetype && 'round') || ''}
            />
          ))}
        </div>
      )}
    </div>
  );
};
