import {BudgetCutItem} from '@common/BudgetCut/BudgetCutExpandable';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

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

/**
 * BudgetCutList component displays a list of budget cuts with detailed breakdowns.
 *
 * Presents a title, optional introductory text (ingress), and a collection of expandable
 * budget cut items showing financial data including budgets, cuts, percentages, and descriptions.
 * Each item can contain nested sub-cuts for detailed breakdowns.
 *
 * Used for displaying political party budget proposals and government spending cuts.
 *
 * @example
 * ```tsx
 * <BudgetCutList
 *   title="Proposed Budget Cuts 2025"
 *   ingress="<p>Our plan to reduce government spending.</p>"
 *   labelBudget="Current Budget"
 *   labelCut="Proposed Cut"
 *   labelPercent="Percentage"
 *   items={[
 *     {
 *       itemID: "1",
 *       title: "Department of Example",
 *       budget: 1000000,
 *       cut: 250000,
 *       percent: 25,
 *       description: "Reduce administrative overhead",
 *       cuts: [
 *         { name: "Office supplies", budget: 100000, cut: 50000, percent: 50 }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
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
