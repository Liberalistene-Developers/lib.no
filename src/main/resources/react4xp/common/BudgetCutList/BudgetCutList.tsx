import {BudgetCutItem} from '/react4xp/common/BudgetCut/BudgetCutExpandable';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';

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

export interface BudgetCutListProps {
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

export const BudgetCutList = ({
  ingress,
  title,
  items = [],
  labelSumCut,
  labelBudget,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText
}: BudgetCutListProps) => (
  <div className="budget-cut-list-holder">
    {title && (
      <div className="budget-cut-list-title">
        <h2 title={title}>{title}</h2>
      </div>
    )}

    {ingress && (
      <div className="page-content">
        <SafeHtml html={ingress} className="ingress" />
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
