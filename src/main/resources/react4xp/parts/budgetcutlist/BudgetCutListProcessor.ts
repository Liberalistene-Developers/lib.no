import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {processHtml} from '/react4xp/utils/html';
import {runQuery} from '/react4xp/utils/query';

/**
 * Budget cut list part configuration from budgetcutlist.xml schema.
 *
 * Supports two item selection modes (manual/query) and includes
 * localized labels for display.
 */
interface BudgetCutListConfig {
  /** Introductory text for the budget cut list (HTML) */
  ingress?: string;
  /** Legacy items array (deprecated, use itemsSet instead) */
  items?: string[];
  /** Item selection configuration */
  itemsSet?: {
    /** Selection mode: 'manual' or 'query' */
    _selected?: string;
    /** Manual selection configuration */
    manual?: {
      /** Array of manually selected budget cut content IDs */
      items?: string[];
    };
    /** Query-based selection configuration */
    query?: {
      /** Root path for content query */
      queryroot?: string;
      /** Sort order for query results */
      querysorting?: string;
      /** Maximum number of items to fetch */
      count?: number;
    };
  };
  /** Localized label for "Budget" */
  labelBudget?: string;
  /** Localized label for "Cut" column */
  labelCut?: string;
  /** Localized explanatory text for numbers */
  labelNumberText?: string;
  /** Localized label for "Percent" column */
  labelPercent?: string;
  /** Localized label for summary section (note: typo in original) */
  labelSumary?: string;
  /** Localized label for "Total cut" */
  labelSumCut?: string;
  /** Localized label for "Title" column */
  labelTitle?: string;
  /** Main title for the budget cut list */
  title?: string;
}

/**
 * Budget cut content data structure from budgetcut content type.
 */
interface BudgetCutData {
  /** Legacy description field (typo, deprecated) */
  decription?: string;
  /** Budget cut description (HTML) */
  description?: string;
  /** Total budget amount */
  budget?: number;
  /** Total amount to be cut */
  cut?: number;
  /** Percentage of budget to be cut */
  percent?: number;
  /** Array of sub-cuts with descriptions */
  cuts?: Array<{description: string}>;
  /** Summary text (HTML) - Note: typo in original name */
  sumary?: string;
}

/**
 * Processes budget cut list configuration and fetches budget cuts for the BudgetCutList component.
 *
 * Supports two item selection modes:
 * - **Manual mode:** Uses explicitly selected budget cuts from configuration
 * - **Query mode:** Fetches budget cuts dynamically via content query
 *
 * Processes HTML content in descriptions and summaries for safe rendering.
 *
 * **Data Flow:**
 * 1. Extracts budget cut list configuration from part component
 * 2. Determines selection mode (manual/query)
 * 3. For manual mode: Uses selected budget cut IDs
 * 4. For query mode: Runs content query to fetch budget cuts
 * 5. For each budget cut:
 *    - Fetches budget cut content data
 *    - Processes HTML in description and summary fields
 *    - Processes HTML in sub-cut descriptions
 * 6. Returns BudgetCutList props with budget cuts and localized labels
 *
 * @param component - The budgetcutlist part component from Enonic XP
 * @returns BudgetCutList props including budget cuts array and labels
 *
 * @example
 * ```ts
 * // Manual mode
 * {
 *   title: "Proposed Budget Cuts 2025",
 *   ingress: "<p>Our plan to reduce spending</p>",
 *   itemsSet: {
 *     _selected: "manual",
 *     manual: { items: ["cut1", "cut2", "cut3"] }
 *   },
 *   labelBudget: "Budget",
 *   labelCut: "Cut (million NOK)",
 *   labelPercent: "Percent"
 * }
 *
 * // Query mode
 * {
 *   title: "All Budget Cuts",
 *   itemsSet: {
 *     _selected: "query",
 *     query: {
 *       queryroot: "/budget-cuts",
 *       querysorting: "displayName ASC",
 *       count: 20
 *     }
 *   }
 * }
 * ```
 *
 * @remarks
 * - Handles legacy 'decription' typo field as fallback
 * - HTML content is processed via processHtml for safe rendering
 * - Legacy 'items' config is merged with itemsSet for backward compatibility
 * - Non-existent budget cuts are filtered out
 * - Sub-cut descriptions are also processed for HTML safety
 */
export const budgetCutListProcessor: ComponentProcessor<'lib.no:budgetcutlist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BudgetCutListConfig;


  const selection = config?.itemsSet?._selected || 'manual';
  const items = [...(config?.items || [])];

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
    title: config?.title,
    ingress: config?.ingress,
    labelBudget: config?.labelBudget,
    labelCut: config?.labelCut,
    labelNumberText: config?.labelNumberText,
    labelPercent: config?.labelPercent,
    labelSumary: config?.labelSumary,
    labelSumCut: config?.labelSumCut,
    labelTitle: config?.labelTitle,
    className: 'grid',
    items: items.map((itemID) => {
      const itemContent = getContent({key: itemID});
      if (!itemContent) {
        return null;
      }

      const itemData = itemContent.data as BudgetCutData;

      return {
        itemID,
        itemPath: itemContent._path,
        title: itemContent.displayName,
        description: processHtml(itemData.description || itemData.decription || ''),
        budget: itemData.budget,
        cut: itemData.cut,
        percent: itemData.percent,
        cuts: (itemData.cuts || []).map(({description, ...rest}) => ({
          ...rest,
          description: processHtml(description)
        })),
        sumary: processHtml(itemData.sumary || '')
      };
    }).filter(Boolean)
  };
};
