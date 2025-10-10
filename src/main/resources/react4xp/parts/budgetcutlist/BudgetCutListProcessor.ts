import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';

interface BudgetCutListConfig {
  ingress?: string;
  items?: string[];
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
  labelBudget?: string;
  labelCut?: string;
  labelNumberText?: string;
  labelPercent?: string;
  labelSumary?: string;
  labelSumCut?: string;
  labelTitle?: string;
  title?: string;
}

interface BudgetCutData {
  decription?: string;
  description?: string;
  budget?: number;
  cut?: number;
  percent?: number;
  cuts?: Array<{description: string}>;
  sumary?: string;
}

export const budgetCutListProcessor: ComponentProcessor<'lib.no:budgetcutlist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BudgetCutListConfig;

  const selection = config?.itemsSet?._selected || 'manual';
  const items = [...(config?.items || [])];

  // TODO: Add back when /lib/shared/query is migrated
  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
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
        // TODO: Add back when /lib/shared/html is migrated
        // description: processHtml(itemData.description || itemData.decription || ''),
        description: itemData.description || itemData.decription || '', // Temporarily unprocessed
        budget: itemData.budget,
        cut: itemData.cut,
        percent: itemData.percent,
        cuts: (itemData.cuts || []).map(({description, ...rest}) => ({
          ...rest,
          // TODO: Add back when /lib/shared/html is migrated
          // description: processHtml(description)
          description // Temporarily unprocessed
        })),
        // TODO: Add back when /lib/shared/html is migrated
        // sumary: processHtml(itemData.sumary || '')
        sumary: itemData.sumary || '' // Temporarily unprocessed
      };
    }).filter(Boolean)
  };
};
