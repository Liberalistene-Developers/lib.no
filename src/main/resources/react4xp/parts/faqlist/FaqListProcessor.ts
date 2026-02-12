import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {processHtml} from '/react4xp/utils/html';
import {runQuery} from '/react4xp/utils/query';

/**
 * Configuration for the FaqList part.
 */
interface FaqListConfig {
  /** Text for anchor/jump link to this list */
  anchorText?: string;
  /** Whether FAQs should be expandable/collapsible */
  expandable?: boolean;
  /** Whether FAQs should be initially expanded */
  expanded?: boolean;
  /** Item selection configuration (manual or query-based) */
  itemsSet?: {
    /** Selection mode: 'manual' or 'query' */
    _selected?: string;
    /** Manual selection configuration */
    manual?: {
      /** Array of FAQ content IDs */
      items?: string[];
    };
    /** Query-based selection configuration */
    query?: {
      /** Root path for content query */
      queryroot?: string;
      /** Sort expression for query results */
      querysorting?: string;
      /** Maximum number of items to return */
      count?: number;
    };
  };
}

/**
 * Content data for FAQ content type.
 */
interface FaqData {
  /** The answer text (HTML content) */
  answer?: string;
}

/**
 * Processor for the FaqList part component.
 *
 * Transforms FAQ list configuration into props for the FaqList React component.
 * Supports two selection modes:
 * - Manual: Explicitly selected FAQ items by content ID
 * - Query: Dynamic FAQ selection based on content query (path, sorting, count)
 *
 * Fetches full FAQ content for each item using XP Content API, processes HTML answers,
 * and generates page URLs for linking.
 *
 * @param component - The part component containing configuration
 * @returns Props object with array of FAQ items and display settings
 *
 * @example
 * ```typescript
 * // Manual selection mode:
 * {
 *   anchorText: 'Common Questions',
 *   expandable: true,
 *   expanded: false,
 *   items: [
 *     {
 *       itemID: 'abc123',
 *       url: '/faq/what-is-liberalistene',
 *       question: 'What is Liberalistene?',
 *       answer: '<p>Liberalistene is...</p>'
 *     }
 *   ]
 * }
 *
 * // Query mode example:
 * {
 *   anchorText: 'Latest FAQs',
 *   expandable: false,
 *   items: [...] // 10 most recent FAQs from /faq folder
 * }
 * ```
 */
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
        'lib.no:faq',
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
