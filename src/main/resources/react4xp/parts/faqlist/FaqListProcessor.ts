import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {processHtml} from '/react4xp/utils/html';
import {runQuery} from '/react4xp/utils/query';

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

  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  } else if (selection === 'query') {
    const queryConfig = config?.itemsSet?.query;
    if (queryConfig?.queryroot) {
      const queryItems = runQuery(
        queryConfig.queryroot,
        queryConfig.count || 10,
        undefined,
        queryConfig.querysorting
      );
      if (queryItems) {
        items.push(...queryItems);
      }
    }
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
        answer: processHtml(faqData.answer || '')
      };
    }).filter(Boolean)
  };
};
