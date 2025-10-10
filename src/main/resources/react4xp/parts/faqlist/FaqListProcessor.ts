import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

interface FaqListConfig {
  anchorText?: string;
  expandable?: boolean;
  expanded?: boolean;
  itemsSet?: {
    _selected?: string;
    manual?: {
      items?: string[];
    };
    query?: {
      queryroot?: string;
      querysorting?: string;
      count?: number;
    };
  };
}

interface FaqData {
  answer?: string;
}

export const faqListProcessor: ComponentProcessor<'lib.no:faqlist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as FaqListConfig;

  const selection = config?.itemsSet?._selected || 'manual';
  const items: string[] = [];

  // TODO: Add back when /lib/shared/query is migrated
  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  }

  return {
    anchorText: config?.anchorText,
    expandable: config?.expandable,
    expanded: config?.expanded,
    items: items.map((itemID) => {
      const faqContent = getContent({key: itemID});
      if (!faqContent) {
        return null;
      }

      const faqData = faqContent.data as FaqData;

      return {
        itemID,
        url: pageUrl({path: faqContent._path}),
        question: faqContent.displayName,
        // TODO: Add back when /lib/shared/html is migrated
        // answer: processHtml(faqData.answer || '')
        answer: faqData.answer || '' // Temporarily unprocessed
      };
    }).filter(Boolean)
  };
};
