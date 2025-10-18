import type {MacroComponentParams} from '@enonic/react-components';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';
import {logger} from '/react4xp/utils/logger';

/**
 * Embed macro for rendering iframe content
 *
 * Note: This macro expects HTML that has already been processed by Enonic XP's
 * macro processing in processHtml(). The iframe content is already safe and
 * approved by XP's macro system.
 *
 * @param props - Macro component parameters from XP
 * @returns Rendered iframe embed or null if no content
 */
export const EmbedMacro = (props: MacroComponentParams) => {
  const {children} = props;

  if (!children) {
    logger.warn('[EmbedMacro] No children provided');
    return null;
  }

  // The embed macro body (children) should contain an iframe
  // The content is already processed by XP's processHtml()
  if (typeof children === 'string') {
    // Add loading="eager" to ensure iframe loads with the document
    const enhancedHtml = children.replace(
      /<iframe/gi,
      '<iframe loading="eager"'
    );

    return (
      <SafeHtml
        html={enhancedHtml}
        className="embed-macro w-full my-4 overflow-hidden"
      />
    );
  }

  return (
    <div className="embed-macro w-full my-4 overflow-hidden">
      {children}
    </div>
  );
};
