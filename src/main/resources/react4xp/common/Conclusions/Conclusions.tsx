import {type FC} from 'react';

/**
 * Individual conclusion item.
 */
export interface ConclusionItem {
  /** Unique key for React rendering */
  key?: string;
  /** The conclusion text (ProgrammePart uses this) */
  conclusion?: string;
  /** Alternative property name (ProgrammeSection uses this) */
  title?: string;
}

/**
 * Props for the Conclusions component.
 */
export interface ConclusionsProps {
  /** Title to display above the conclusions */
  title?: string;
  /** Array of conclusion items to render */
  items: ConclusionItem[];
}

/**
 * Conclusions component for rendering a list of conclusions with consistent styling.
 *
 * Renders a styled list of conclusions with:
 * - Optional bold, left-aligned title
 * - Bulleted list with proper indentation
 * - Consistent spacing
 *
 * Used by both ProgrammeSection and ProgrammePart to ensure uniform conclusion styling
 * across all programme components.
 *
 * @example
 * ```tsx
 * <Conclusions
 *   title="Liberalistene vil:"
 *   items={[
 *     {key: '1', conclusion: 'First point'},
 *     {key: '2', conclusion: 'Second point'}
 *   ]}
 * />
 * ```
 *
 * @remarks
 * - Supports both `conclusion` and `title` properties for backward compatibility
 * - Applies Tailwind classes for consistent styling
 * - Title is rendered with `font-bold text-left`
 * - List uses `list-disc pl-6` for bullets and indentation
 * - Top margin `mt-10` matches ProgrammePart spacing
 */
export const Conclusions: FC<ConclusionsProps> = ({title, items}) => (
  <div className="conclusions mt-10">
    {title && (
      <div className="conclusions-header mb-4">
        <div className="title font-bold text-left">{title}</div>
      </div>
    )}
    <ul className="list-disc pl-6">
      {items.map(({key, conclusion, title: itemTitle}) => (
        <li key={key}>
          {conclusion || itemTitle}
        </li>
      ))}
    </ul>
  </div>
);
