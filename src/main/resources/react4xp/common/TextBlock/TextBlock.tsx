import {type FC} from 'react';

import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the TextBlock component
 */
export interface TextBlockProps {
  /** Content text (HTML) */
  text?: string;
  /** Block title */
  title?: string;
  /** CSS color class for the title */
  titleColor?: string;
}

/**
 * TextBlock component displays a centered text content block with optional title.
 *
 * Renders a vertically centered title and text content in a column layout.
 * Both title and text are optional; the component renders nothing if both are empty.
 * Used for displaying text-heavy content sections.
 *
 * @example
 * ```tsx
 * <TextBlock
 *   title="About Us"
 *   titleColor="text-primary-700"
 *   text="<p>We are a political party...</p>"
 * />
 * ```
 */
export const TextBlock: FC<TextBlockProps> = ({
  text = '',
  title = '',
  titleColor = ''
}) => {
  return (
    <>
      {(title || text) && (
        <div className="flex flex-col justify-center items-center gap-y-5">
          {title && (
            <div className={`flex flex-col justify-center items-center ${titleColor}`}>
              <h2 className="font-bold text-[50px] leading-[60px]">{title}</h2>
            </div>
          )}
          {text && (
            <div>
              <SafeHtml html={text} className="page-content" />
            </div>
          )}
        </div>
      )}
    </>
  );
};
