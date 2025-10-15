import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {processHtml} from '/react4xp/utils/html';

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

  log.info(`[FaqProcessor] Processing path: ${partComponent.path}`);

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as FaqData;

  return {
    expandable: config?.expandable,
    expanded: config?.expanded,
    question: content.displayName,
    answer: processHtml(data.answer || ''),
    tags: data.tags
  };
};
