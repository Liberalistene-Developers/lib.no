import {type FC} from 'react';

import { ListItem } from '/react4xp/common/ListItem/ListItem';
import type { ItemData as BaseItemData } from '/react4xp/common/types';

interface ItemData extends BaseItemData {
  role?: string;
  email?: string;
}

interface PersonListItemProps {
  imageSize?: 'small' | 'medium' | 'large';
  imageType?: 'round' | '';
  item?: ItemData;
  showRole?: boolean;
  showEmail?: boolean;
  showDescriptions?: boolean;
  fields?: Record<string, unknown>;
}

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
