import * as React from 'react';

import {SafeHtml} from '@common/SafeHtml/SafeHtml';

interface CutItem {
  name?: string;
  budget?: number;
  cut?: number;
  percent?: number;
  description?: string;
}

interface BudgetCutProps {
  budget?: number;
  cut?: number;
  cuts?: CutItem[];
  description?: string;
  percent?: number;
  sumary?: string;
  title?: string;
  labelSumCut?: string;
  labelTitle?: string;
  labelPercent?: string;
  labelCut?: string;
  labelNumberText?: string;
  labelSumary?: string;
}

export const BudgetCut: React.FC<BudgetCutProps> = ({
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
            <React.Fragment key={name?.replace(/ /g, '-')}>
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
            </React.Fragment>
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
                <React.Fragment key={name?.replace(/ /g, '-')}>
                  <dt>{name}:</dt>
                  <SafeHtml html={desc || ''} as="dd" />
                </React.Fragment>
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
