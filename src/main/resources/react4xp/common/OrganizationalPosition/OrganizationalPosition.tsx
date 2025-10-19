import {type FC} from 'react';

import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the OrganizationalPosition component
 */
interface OrganizationalPositionProps {
  /** Position title (displayed as H1) */
  title?: string;
  /** Full description of the position (HTML) */
  description?: string;
  /** Brief summary of the position (HTML) */
  shortDescription?: string;
  /** Topic tags (currently unused in rendering) */
  tags?: string[];
}

/**
 * OrganizationalPosition component displays information about an organizational role.
 *
 * Shows the position title, a short description, and a full description.
 * Used for displaying information about board positions, committee roles, or
 * other organizational positions within the party.
 *
 * @example
 * ```tsx
 * <OrganizationalPosition
 *   title="Party Secretary"
 *   shortDescription="<p>Responsible for administrative tasks...</p>"
 *   description="<p>Full detailed description of responsibilities...</p>"
 * />
 * ```
 */
export const OrganizationalPosition: FC<OrganizationalPositionProps> = ({
  title = '',
  description = '',
  shortDescription = ''
}) => {
  return (
    <div>
      <h1 title={title}>{title}</h1>
      {shortDescription && <SafeHtml html={shortDescription} />}
      {description && <SafeHtml html={description} />}
    </div>
  );
};
