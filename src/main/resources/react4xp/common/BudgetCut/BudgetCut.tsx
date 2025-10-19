import {type FC, Fragment} from 'react';

import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Individual budget cut item with details.
 */
interface CutItem {
  /** Name or category of the budget cut */
  name?: string;
  /** Original budget amount (currently unused in rendering) */
  budget?: number;
  /** Amount to be cut from this category */
  cut?: number;
  /** Percentage of the budget to be cut */
  percent?: number;
  /** Detailed description explaining the budget cut (HTML) */
  description?: string;
}

/**
 * Props for the BudgetCut component.
 */
interface BudgetCutProps {
  /** Total budget amount */
  budget?: number;
  /** Total amount to be cut from the budget */
  cut?: number;
  /** List of individual budget cut items */
  cuts?: CutItem[];
  /** Introductory description of the budget cuts (HTML) */
  description?: string;
  /** Total percentage of budget to be cut */
  percent?: number;
  /** Summary text explaining the overall budget cuts (HTML) */
  sumary?: string;
  /** Title or name of the budget category */
  title?: string;
  /** Localized label for "Total cut" (e.g., "Sum kutt") */
  labelSumCut?: string;
  /** Localized label for "Title" column header */
  labelTitle?: string;
  /** Localized label for "Percent" column header */
  labelPercent?: string;
  /** Localized label for "Cut" column header */
  labelCut?: string;
  /** Localized explanatory text for numbers (e.g., "All amounts in million NOK") */
  labelNumberText?: string;
  /** Localized label for the summary section */
  labelSumary?: string;
}

/**
 * BudgetCut component for displaying detailed budget cut proposals in a table format.
 *
 * Renders a comprehensive budget cut breakdown with:
 * - An optional introductory description
 * - A three-column grid table showing category names, cut percentages, and amounts
 * - Individual cut items with detailed descriptions
 * - Total cut amount and percentage in the footer row
 * - Optional summary section
 *
 * @example
 * ```tsx
 * <BudgetCut
 *   title="State Budget 2024"
 *   budget={1000}
 *   cut={150}
 *   percent={15}
 *   description="<p>Proposed budget cuts for fiscal year 2024</p>"
 *   cuts={[
 *     {name: 'Education', cut: 50, percent: 5, description: '<p>Reduce administrative costs</p>'},
 *     {name: 'Healthcare', cut: 100, percent: 10, description: '<p>Efficiency improvements</p>'}
 *   ]}
 *   labelTitle="Category"
 *   labelPercent="Percent"
 *   labelCut="Cut (million NOK)"
 *   labelSumCut="Total Cut"
 *   labelNumberText="All amounts in million NOK"
 *   sumary="<p>These cuts will reduce government spending by 15%</p>"
 * />
 * ```
 *
 * @remarks
 * - The table uses a CSS grid with three columns: name (auto width), percent (80px), cut (80px)
 * - The footer row has a double bottom border to visually separate totals
 * - Cut item descriptions are only shown if they exist and are displayed in a definition list below the table
 * - HTML content is sanitized via SafeHtml component
 * - Note: There's a typo in the prop name `sumary` (should be `summary`)
 */
export const BudgetCut: FC<BudgetCutProps> = ({
  budget,
  cut,
  cuts = [],
  description = '',
  percent,
  sumary = '',
  title = '',
  labelSumCut,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText,
  labelSumary
}) => (
  <>
    <div className="mt-10">
      {description && (
        <SafeHtml html={description} />
      )}
      <div className="grid max-w-full grid-cols-[auto_80px_80px] [grid-template-areas:'header_header_header'_'main_main_main'_'footer_footer_footer'] [&_.budget-cut-percent]:flex [&_.budget-cut-percent]:items-end [&_.budget-cut-percent]:justify-end [&_.budget-cut-cuts]:flex [&_.budget-cut-cuts]:items-end [&_.budget-cut-cuts]:justify-end [&_.header]:border-b [&_.header]:border-gray-500 [&_.footer]:border-t-2 [&_.footer]:border-b-[5px] [&_.footer]:border-gray-500 [&_.footer]:border-b-double">
        <div className="budget-cut-name header">
          <strong>{labelTitle}</strong>
        </div>
        <div className="budget-cut-percent header">
          <strong>{labelPercent}</strong>
        </div>
        <div className="budget-cut-cuts header">
          <strong>{labelCut}</strong>
        </div>
        {budget && (
          <>
            <div className="budget-cut-name header">
              <strong>{title}</strong> (<strong>{budget}</strong>)
            </div>
            <div className="budget-cut-cuts header">
            </div>
            <div className="budget-cut-percent header">
            </div>
          </>
        )}
        {(cuts && cuts.length > 0 && cuts
          .map(({
            name,
            cut: itemCut,
            percent: itemPercent
          }) => (
            <Fragment key={name?.replace(/ /g, '-')}>
              <div className="budget-cut-name">
                {name}
              </div>
              <div className="budget-cut-percent">
                {itemPercent && (
                  <span>{itemPercent}%</span>
                )}
              </div>
              <div className="budget-cut-cuts">
                {itemCut && (
                  <span>{itemCut}</span>
                )}
              </div>
            </Fragment>
          ))) ||
          null}
        {cut && (
          <>
            <div className="budget-cut-name footer">
              <strong>{labelSumCut}</strong>
            </div>
            <div className="budget-cut-percent footer">
              {percent && (
                <strong>{percent}%</strong>
              )}
            </div>
            <div className="budget-cut-cuts footer">
              {cut && (
                <strong>{cut}</strong>
              )}
            </div>
          </>
        )}
      </div>
      {labelNumberText && (
        <div className="text-right"><em><span>{labelNumberText}</span></em></div>
      )}

      <div className="[&_dl_dt]:font-bold">
        {(cuts && cuts.length > 0 && (
          <dl>
            {cuts
              .filter(({description: desc}) => desc)
              .map(({
                name,
                description: desc
              }) => (
                <Fragment key={name?.replace(/ /g, '-')}>
                  <dt>{name}:</dt>
                  <SafeHtml html={desc || ''} as="dd" />
                </Fragment>
              ))}
          </dl>
        )) || null}

        {sumary && (
          <>
            {labelSumary && (
              <div>
                <strong>{labelSumary}</strong>
              </div>
            )}
            <SafeHtml html={sumary} />
          </>
        )}
      </div>
    </div>
  </>
);
