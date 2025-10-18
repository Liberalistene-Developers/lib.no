import {type FC} from 'react';

import { ListItem } from '/react4xp/common/ListItem/ListItem';
import type { ItemData as BaseItemData } from '/react4xp/common/types';

/**
 * Extended item data with person-specific fields
 */
interface ItemData extends BaseItemData {
  /** Person's role/position */
  role?: string;
  /** Person's email address */
  email?: string;
}

/**
 * Props for the PersonListItem component
 */
interface PersonListItemProps {
  /** Size of the person's image - 'small', 'medium', or 'large' */
  imageSize?: 'small' | 'medium' | 'large';
  /** Image style - 'round' for circular images */
  imageType?: 'round' | '';
  /** Person item data */
  item?: ItemData;
  /** Whether to display the person's role */
  showRole?: boolean;
  /** Whether to display the person's email */
  showEmail?: boolean;
  /** Whether to show descriptions */
  showDescriptions?: boolean;
  /** Additional fields to pass to ListItem */
  fields?: Record<string, unknown>;
}

/**
 * PersonListItem component displays a single person in a list.
 *
 * Wraps the generic ListItem component with person-specific rendering
 * for role and email. Used in person listings, board displays, and
 * candidate lists to maintain consistent person presentation.
 *
 * @example
 * ```tsx
 * <PersonListItem
 *   item={{name: 'John Doe', role: 'Board Member', email: 'john@example.com'}}
 *   imageSize="medium"
 *   imageType="round"
 *   showRole={true}
 *   showEmail={true}
 * />
 * ```
 */
export const PersonListItem: FC<PersonListItemProps> = ({
  imageSize,
  imageType,
  item = {},
  showRole = true,
  showEmail = false,
  showDescriptions = false,
  fields
}) => {
  const { role, email } = item;

  return (
    <ListItem item={item} imageSize={imageSize} imageType={imageType} fields={fields} showDescriptions={showDescriptions} className="person">
      <>
        {showRole && role && (
          <span className="text-primary-300 font-bold text-[22px] leading-[26px] mb-[5px]">{role}</span>
        )}
        {showEmail && email && (
          <a href={`mailto:${email}`} rel="noreferrer">{email}</a>
        )}
      </>
    </ListItem>
  );
};
