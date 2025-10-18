import {type FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const iconResolver: Record<string, IconDefinition> = {
  faMap,
  faGlobe,
  faClock
};

/**
 * Props for the FAIcon component
 */
export interface FAIconProps {
  /** Icon type identifier matching iconResolver keys ('faMap', 'faGlobe', 'faClock') */
  iconType?: string;
}

/**
 * FontAwesome icon component with predefined icon set
 *
 * Renders FontAwesome icons from a predefined resolver map. Returns null if iconType
 * is not provided or not found in the resolver.
 *
 * **Available icons:**
 * - `faMap` - Map/location icon
 * - `faGlobe` - Globe/website icon
 * - `faClock` - Clock/time icon
 *
 * **Note:** To add new icons, import from `@fortawesome/free-solid-svg-icons` and
 * add to the `iconResolver` object.
 *
 * @example
 * ```tsx
 * // Render a map icon
 * <FAIcon iconType="faMap" />
 *
 * // Render a clock icon
 * <FAIcon iconType="faClock" />
 *
 * // Invalid icon type returns null
 * <FAIcon iconType="faInvalid" /> // renders nothing
 * ```
 */
export const FAIcon: FC<FAIconProps> = ({ iconType }) => {
  if (!iconType || !iconResolver[iconType]) {
    return null;
  }

  return <FontAwesomeIcon icon={iconResolver[iconType]} />;
};
