import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const BudgetCut = ({
  budget,
  cut = '',
  cuts = [],
  description = '',
  percent = '',
  sumary = '',
  title = '',
  labelSumCut,
  labelBudget,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText,
  labelSumary
}) => (
  <>
    <div className="budget-cut-content">
      { description && (
        <div className="budget-cut-text" dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <div className="budget-cut-table">
        <div className="budget-cut-name header">
          <strong>{labelTitle}</strong>
        </div>
        <div className="budget-cut-percent header">
          <strong>{labelPercent}</strong>
        </div>
        <div className="budget-cut-cuts header">
          <strong>{labelCut}</strong>
        </div>
      { budget && (
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
      { (cuts && cuts.length > 0 && cuts
        .map(({
          name,
          budget: itemBudget,
          cut: itemCut,
          percent: itemPercent
        }) => (
            <Fragment key={name.replace(/ /g, '-')}>
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
      null }
      { cut && (
        <>
          <div className="budget-cut-name footer">
            <strong>{labelSumCut}</strong>
          </div>
          <div className="budget-cut-percent footer">
            { percent && (
              <strong>{percent}%</strong>
            )}
          </div>
          <div className="budget-cut-cuts footer">
            { cut && (
              <strong>{cut}</strong>
            )}
          </div>
        </>
      )}
    </div>
    { labelNumberText && (
      <div className="numbers-description"><em><span>{ labelNumberText }</span></em></div>
    )}

    <div className="budget-cut-sumary">
      { (cuts && cuts.length > 0 && (
        <dl>
          { cuts
            .filter(({ description: desc }) => desc)
            .map(({
              name,
              description: desc
            }) => (
              <Fragment key={name.replace(/ /g, '-')}>
                <dt>{name}:</dt>
                <dd dangerouslySetInnerHTML={{ __html: desc }} />
              </Fragment>
            ))}
        </dl>
      )) || null }

        { sumary && (
          <>
            { labelSumary && (
              <div className="budget-cut-sumary-title">
                <strong>{labelSumary}</strong>
              </div>
            )}
            <div className="budget-cut-sumary-text" dangerouslySetInnerHTML={{ __html: sumary }} />
          </>
        )}
      </div>
    </div>
  </>
)

BudgetCut.propTypes = {
  budget: PropTypes.number,
  cut: PropTypes.number,
  cuts: PropTypes
    .arrayOf(PropTypes
      .shape({
        name: PropTypes.string,
        budget: PropTypes.number,
        cut: PropTypes.number,
        percent: PropTypes.number,
        description: PropTypes.string
      })),
  description: PropTypes.string,
  labelBudget: PropTypes.string,
  labelCut: PropTypes.string,
  labelNumberText: PropTypes.string,
  labelPercent: PropTypes.string,
  labelSumCut: PropTypes.string,
  labelSumary: PropTypes.string,
  labelTitle: PropTypes.string,
  percent: PropTypes.number,
  sumary: PropTypes.string,
  title: PropTypes.string
}

export default (props) => <BudgetCut {...props} /> // eslint-disable-line react/display-name
