import type { PartComponent } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { imageUrl } from '/react4xp/utils/image';

/**
 * Title block part configuration from titleblock.xml schema.
 */
interface TitleBlockConfig {
  /** Background image reference */
  image?: string;
  /** Position of header text: 'left', 'center', 'right' */
  headerPosition?: string;
  /** Overlay style for image: opacity levels or color overlays */
  imageOverlay?: string;
  /** Ingress/subtitle text */
  ingress?: string;
  /** Color for the ingress text */
  ingressColor?: string;
  /** Legacy title field (used when titleSet not configured) */
  title?: string;
  /** Legacy header color field (used when titleSet not configured) */
  headerColor?: string;
  /** Title set configuration for simple or fancy title display */
  titleSet?: {
    /** Selection mode: 'simple' or 'fancy' */
    _selected?: string;
    /** Simple title configuration (single title with color) */
    simple?: {
      /** Title text */
      title?: string;
      /** Title color */
      titleColor?: string;
    };
    /** Fancy title configuration (multiple titles with individual colors) */
    fancy?: {
      /** Array of title segments with individual colors */
      titles?: Array<{title: string; titleColor: string}>;
    };
  };
  /** Mobile responsive size class */
  mobileSize?: string;
}

/**
 * Processes title block configuration for the TitleBlock component.
 *
 * Supports both simple single-color titles and fancy multi-color title segments.
 * Handles legacy title fields and includes background image with overlay support.
 * The title can be positioned and includes an optional ingress/subtitle.
 *
 * Used for creating hero sections, page headers, and prominent title displays.
 *
 * **Data Flow:**
 * 1. Extracts title block configuration from part component
 * 2. Determines title mode (simple or fancy)
 * 3. If simple mode:
 *    - Uses titleSet.simple configuration
 *    - Falls back to legacy title/headerColor fields
 * 4. If fancy mode:
 *    - Uses titleSet.fancy.titles array for multi-segment titles
 * 5. Processes background image with 'full' size
 * 6. Applies overlay style if configured
 * 7. Returns TitleBlock props with title configuration and styling
 *
 * @param component - The titleblock part component from Enonic XP
 * @returns TitleBlock props including title(s), image, position, and styling
 *
 * @example
 * ```ts
 * // Simple title configuration
 * {
 *   image: "hero-bg-123",
 *   headerPosition: "center",
 *   imageOverlay: "dark",
 *   ingress: "Building a free society",
 *   ingressColor: "white",
 *   titleSet: {
 *     _selected: "simple",
 *     simple: {
 *       title: "Freedom & Prosperity",
 *       titleColor: "primary-500"
 *     }
 *   },
 *   mobileSize: "full"
 * }
 *
 * // Fancy multi-color title configuration
 * {
 *   image: "hero-bg-456",
 *   headerPosition: "left",
 *   titleSet: {
 *     _selected: "fancy",
 *     fancy: {
 *       titles: [
 *         {title: "Individual", titleColor: "blue-500"},
 *         {title: "Freedom", titleColor: "red-500"},
 *         {title: "Matters", titleColor: "green-500"}
 *       ]
 *     }
 *   }
 * }
 *
 * // Returns:
 * {
 *   Tag: "h1",
 *   image: {...},
 *   title: [{title: "Freedom & Prosperity", titleColor: "primary-500"}],
 *   position: "center",
 *   ingress: "Building a free society",
 *   ingressColor: "white",
 *   overlay: "overlay dark",
 *   titleClassName: "full"
 * }
 * ```
 *
 * @remarks
 * - Defaults to 'simple' mode if _selected is not specified
 * - Legacy title/headerColor fields are used as fallback for simple mode
 * - Background image uses 'full' size for optimal display
 * - Overlay is prefixed with 'overlay' class when present
 * - Title is always rendered as h1 tag (Tag: 'h1')
 * - Mobile size class defaults to 'full' if not specified
 * - Fancy mode supports unlimited title segments with individual colors
 * - Title array is always returned, even for simple mode (wrapped in array)
 */
export const titleBlockProcessor: ComponentProcessor<'lib.no:titleblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as TitleBlockConfig;


  const selection = config?.titleSet?._selected || 'simple';
  const oldTitle = config?.title;
  const headerColor = config?.headerColor;

  const simpleTitle = {
    title: oldTitle,
    titleColor: headerColor
  };

  const titleList = selection === 'simple'
    ? [config?.titleSet?.simple || simpleTitle]
    : (config?.titleSet?.fancy?.titles || []);

  return {
    Tag: 'h1',
    image: imageUrl(config?.image, 'full'),
    // image: config?.image, // Temporarily unprocessed
    title: titleList,
    position: config?.headerPosition,
    ingress: config?.ingress,
    ingressColor: config?.ingressColor,
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    titleClassName: config?.mobileSize || 'full'
  };
};
