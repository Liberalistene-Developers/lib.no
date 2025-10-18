import {type FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const iconResolver: Record<string, IconDefinition> = {
  faMap,
  faGlobe,
  faClock
};

export interface FAIconProps {
  iconType?: string;
}

export const FAIcon: FC<FAIconProps> = ({ iconType }) => {
  if (!iconType || !iconResolver[iconType]) {
    return null;
  }

  return <FontAwesomeIcon icon={iconResolver[iconType]} />;
};
