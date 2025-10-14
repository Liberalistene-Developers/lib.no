import type {MacroComponentParams} from '@enonic/react-components';
import React from 'react';

export const EmbedMacro = (props: MacroComponentParams) => {
  const {children} = props;

  if (!children) {
    console.warn('[EmbedMacro] No children provided');
    return null;
  }

  // The embed macro body (children) should contain an iframe
  // We use dangerouslySetInnerHTML for string content or render JSX elements directly
  if (typeof children === 'string') {
    // Add loading="eager" to ensure iframe loads with the document
    const enhancedHtml = children.replace(
      /<iframe/gi,
      '<iframe loading="eager"'
    );

    return (
      <div
        className="embed-macro w-full my-4 overflow-hidden"
        dangerouslySetInnerHTML={{__html: enhancedHtml}}
      />
    );
  }

  return (
    <div>
      {children}
    </div>
  );
};
