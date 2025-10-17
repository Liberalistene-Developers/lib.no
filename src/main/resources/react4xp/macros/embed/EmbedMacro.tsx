import type {MacroComponentParams} from '@enonic/react-components';
import React from 'react';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';

export const EmbedMacro = (props: MacroComponentParams) => {
  const {children} = props;

  if (!children) {
    console.warn('[EmbedMacro] No children provided');
    return null;
  }

  // The embed macro body (children) should contain an iframe
  // We use SafeHtml with custom config to allow iframes
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
        sanitizeConfig={{
          ALLOWED_TAGS: ['iframe'],
          ALLOWED_ATTR: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'loading', 'title', 'style']
        }}
      />
    );
  }

  return (
    <div>
      {children}
    </div>
  );
};
