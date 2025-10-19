import {type FC} from 'react';

import {BudgetCut} from './BudgetCut';

interface CutItem {
  name?: string;
  budget?: number;
  cut?: number;
  percent?: number;
  description?: string;
}

interface BudgetCutPageProps {
  title?: string;
  budget?: number;
  cut?: string;
  cuts?: CutItem[];
  description?: string;
  percent?: number;
  sumary?: string;
  labelSumCut?: string;
  labelBudget?: string;
  labelTitle?: string;
  labelPercent?: string;
  labelCut?: string;
  labelNumberText?: string;
}

export const BudgetCutPage: FC<BudgetCutPageProps> = ({
  title,
  budget,
  cut,
  cuts = [],
  description = '',
  percent,
  sumary = '',
  labelSumCut,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText
}) => (
  <div className="budget-cut-holder">
    <div className="budget-cut-item">
      <div className="budget-cut-title">
        <h1 title={title}>{title}</h1>
      </div>

      <BudgetCut
        title={title}
        budget={budget}
        cut={cut as unknown as number}
        cuts={cuts}
        description={description}
        percent={percent}
        sumary={sumary}
        labelSumCut={labelSumCut}
        labelTitle={labelTitle}
        labelPercent={labelPercent}
        labelCut={labelCut}
        labelNumberText={labelNumberText}
      />
    </div>
  </div>
);
