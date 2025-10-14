import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {processHtml} from '/react4xp/utils/html';
import {runQuery} from '/react4xp/utils/query';

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
