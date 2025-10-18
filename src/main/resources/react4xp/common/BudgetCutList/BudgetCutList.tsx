import {BudgetCutItem} from '@common/BudgetCut/BudgetCutExpandable';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Individual budget cut sub-item within a budget cut list item.
 */
interface CutItem {
  /** Name or category of the budget cut */
  name?: string;
  /** Original budget amount */
  budget?: number;
  /** Amount to be cut from this category */
  cut?: number;
  /** Percentage of the budget to be cut */
  percent?: number;
  /** Detailed description explaining the budget cut (HTML) */
  description?: string;
}

/**
 * Individual item in the budget cut list with expandable details.
 */
interface BudgetCutListItem {
  /** Unique identifier for the list item */
  itemID?: string;
  /** Title of the budget category */
  title?: string;
  /** Total budget amount */
  budget?: number;
  /** Total amount to be cut */
  cut?: number;
  /** List of sub-cuts within this category */
  cuts?: CutItem[];
  /** Description of the budget cut (HTML) */
  description?: string;
  /** Percentage of budget to be cut */
  percent?: number;
  /** Summary text (HTML) - Note: typo in original name */
  sumary?: string;
}

/**
 * Props for the BudgetCutList component.
 */
export interface BudgetCutListProps {
  /** Introductory text displayed before the list (HTML) */
  ingress?: string;
  /** Main title for the budget cut list */
  title?: string;
  /** Array of budget cut items to display */
  items?: BudgetCutListItem[];
  /** Localized label for "Total cut" */
  labelSumCut?: string;
  /** Localized label for "Budget" */
  labelBudget?: string;
  /** Localized label for "Title" column header */
  labelTitle?: string;
  /** Localized label for "Percent" column header */
  labelPercent?: string;
  /** Localized label for "Cut" column header */
  labelCut?: string;
  /** Localized explanatory text for numbers */
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
