import * as React from 'react';

import {BudgetCutItem} from './BudgetCutExpandable';

interface CutItem {
  name?: string;
  budget?: number;
  cut?: number;
  percent?: number;
  description?: string;
}

interface BudgetCutListItem {
  itemID?: string;
  title?: string;
  budget?: number;
  cut?: number;
  cuts?: CutItem[];
  description?: string;
  percent?: number;
  sumary?: string;
}

interface BudgetCutListProps {
  ingress?: string;
  title?: string;
  items?: BudgetCutListItem[];
  labelSumCut?: string;
  labelBudget?: string;
  labelTitle?: string;
  labelPercent?: string;
  labelCut?: string;
  labelNumberText?: string;
}

export const BudgetCutList: React.FC<BudgetCutListProps> = ({
  ingress,
  title,
  items = [],
  labelSumCut,
  labelBudget,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText
}) => (
  <div className="budget-cut-list-holder">
    {title && (
      <div className="budget-cut-list-title">
        <h2 title={title}>{title}</h2>
      </div>
    )}

    {ingress && (
      <div className="page-content">
        <div className="ingress rich-text" dangerouslySetInnerHTML={{__html: ingress}} />
      </div>
    )}

    {items && items.length > 0 && (
      <div className={'budget-cut-list'}>
        {items
          .map(({
            itemID,
            title: itemTitle,
            budget,
            cut,
            cuts,
            description,
            percent,
            sumary
          }) => (
            <BudgetCutItem
              key={itemID}
              title={itemTitle}
              budget={budget}
              cut={cut}
              cuts={cuts}
              description={description}
              percent={percent}
              sumary={sumary}
              labelSumCut={labelSumCut}
              labelBudget={labelBudget}
              labelTitle={labelTitle}
              labelPercent={labelPercent}
              labelCut={labelCut}
              labelNumberText={labelNumberText}
            />
          ))}
      </div>
    )}
  </div>
);
