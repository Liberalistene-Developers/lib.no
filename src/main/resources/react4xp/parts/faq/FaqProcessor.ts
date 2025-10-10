import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';

interface FaqConfig {
  expandable?: boolean;
  expanded?: boolean;
}

interface FaqData {
  answer?: string;
  tags?: string;
}

export const faqProcessor: ComponentProcessor<'lib.no:faq'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as FaqConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as FaqData;

  return {
    expandable: config?.expandable,
    expanded: config?.expanded,
    question: content.displayName,
    // TODO: Add back when /lib/shared/html is migrated
    // answer: processHtml(data.answer || ''),
    answer: data.answer || '', // Temporarily unprocessed
    tags: data.tags
  };
};
