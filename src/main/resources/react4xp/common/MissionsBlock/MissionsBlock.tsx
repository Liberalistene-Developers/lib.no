import {Mission} from '@common/Mission/Mission';

/**
 * Represents a mission item
 */
interface MissionItem {
  /** Mission description text (HTML) */
  description?: string;
  /** Mission icon/image */
  image?: {
    /** Image URL */
    url?: string;
  };
  /** Mission title */
  title?: string;
}

/**
 * Props for the MissionsBlock component
 */
export interface MissionsBlockProps {
  /** Array of mission items to display */
  items?: MissionItem[];
}

/**
 * MissionsBlock component displays multiple mission statements in a grid.
 *
 * Renders a responsive grid of Mission components. Shows 2 columns on desktop
 * and switches to a single column on mobile. Returns null if no items are provided.
 * Used for displaying party missions, values, or key principles.
 *
 * @example
 * ```tsx
 * <MissionsBlock
 *   items={[
 *     {
 *       title: 'Freedom',
 *       image: {url: '/icons/freedom.svg'},
 *       description: '<p>Individual liberty is paramount</p>'
 *     },
 *     {
 *       title: 'Equality',
 *       image: {url: '/icons/equality.svg'},
 *       description: '<p>Equal rights for all</p>'
 *     }
 *   ]}
 * />
 * ```
 */
export const MissionsBlock = ({
  items = []
}: MissionsBlockProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap my-5 [&>*]:w-[calc(50%-10px)] mobile:flex-col mobile:flex-nowrap mobile:[&>*]:w-full">
      {items && items.map((item) => (<Mission key={item.title} {...item} />))}
    </div>
  );
};
