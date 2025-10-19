import {type FC} from 'react';

/**
 * Type-safe icon identifiers for available FontAwesome solid icons.
 *
 * These icons are rendered via CSS (solid-icons.css) for minimal bundle size.
 * To add a new icon, update this type AND add the corresponding CSS in solid-icons.css.
 */
export type FAIconType = 'faMap' | 'faGlobe' | 'faClock' | 'faEye' | 'faEyeSlash' | 'faLink' | 'faEnvelope' | 'faPhone';

/**
 * Maps icon type to CSS class name
 */
const iconClassMap: Record<FAIconType, string> = {
  faMap: 'fa-map',
  faGlobe: 'fa-globe',
  faClock: 'fa-clock',
  faEye: 'fa-eye',
  faEyeSlash: 'fa-eye-slash',
  faLink: 'fa-link',
  faEnvelope: 'fa-envelope',
  faPhone: 'fa-phone'
};

/**
 * Props for the FAIcon component
 */
export interface FAIconProps {
  /** Icon type identifier - TypeScript enforces only known icons can be used */
  iconType: FAIconType;
}

/**
 * Minimal FontAwesome icon component with CSS-based rendering.
 *
 * Renders FontAwesome solid icons using pure CSS (no React component overhead).
 * Type-safe via TypeScript union type - only defined icons can be used.
 *
 * **Benefits:**
 * - ✅ Type-safe: TypeScript errors on unknown icons
 * - ✅ Minimal bundle: CSS only, no FontAwesome React packages
 * - ✅ Tree-shakeable: Only used icon CSS is included
 * - ✅ Clean API: Simple component interface
 *
 * **Available icons:**
 * - `faMap` - Map/location icon
 * - `faGlobe` - Globe/website icon
 * - `faClock` - Clock/time icon
 * - `faEye` - Eye/view icon
 * - `faEyeSlash` - Eye-slash/hide icon
 * - `faLink` - Link/hyperlink icon
 * - `faEnvelope` - Envelope/email icon
 * - `faPhone` - Phone/telephone icon
 *
 * **To add new icons:**
 * 1. Add icon to `FAIconType` union type
 * 2. Add mapping to `iconClassMap`
 * 3. Add icon CSS to `solid-icons.css`
 *
 * @example
 * ```tsx
 * // Render a map icon
 * <FAIcon iconType="faMap" />
 *
 * // Render an eye icon
 * <FAIcon iconType="faEye" />
 *
 * // TypeScript error - icon doesn't exist
 * <FAIcon iconType="faInvalid" /> // TS Error!
 * ```
 */
export const FAIcon: FC<FAIconProps> = ({ iconType }) => (
  <i className={`fas ${iconClassMap[iconType]}`}></i>
);
