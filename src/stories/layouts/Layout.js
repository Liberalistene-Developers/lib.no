import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SingleLayout = ({ background, fullWidth, paddingBottom, paddingTop, children }) => (
  <main>
    <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
      <div className={`content${fullWidth ? ' full' : ''}`}>
        <div className="content-item">
          {children}
        </div>
      </div>
    </div>
  </main>
)

SingleLayout.propTypes = {
  background: PropTypes.oneOf(['standard', 'white', 'purple', 'yellow']),
  fullWidth: PropTypes.bool,
  paddingBottom: PropTypes.bool,
  paddingTop: PropTypes.bool
}

SingleLayout.defaultProps = {
  background: 'standard',
  fullWidth: false,
  paddingBottom: false,
  paddingTop: false
}

const SingleColumn2row = ({ background, fullWidth, paddingBottom, paddingTop, children, order }) => {
  const [first, second] = children ? [].concat(children) : []

  return (
    <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
      <div className={`content${fullWidth ? ' full' : ''}`}>
        <div className={`content-item items ${order}`}>
          <div className="content-child full">
            {first}
          </div>
          <div className="content-child full">
            {second}
          </div>
        </div>
      </div>
    </div>
  )
}

SingleColumn2row.propTypes = {
  ...SingleLayout.propTypes,
  order: PropTypes.string
}

SingleColumn2row.defaultProps = {
  ...SingleLayout.defaultProps,
  order: ''
}

const TwoColumnLayout = ({ background, fullWidth, paddingBottom, paddingTop, children, leftClassName, rightClassName }) => {
  const [first, second] = children ? [].concat(children) : []

  return (
    <main>
      <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className="content-item items">
            <div className={`content-child left ${leftClassName}`}>
              {first}
            </div>
            <div className={`content-child right ${rightClassName}`}>
              {second}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const classes = PropTypes.oneOf(['', 'one', 'one-20', 'one-30', 'one-33', 'one-40', 'two-60', 'two-66', 'two-70', 'four'])

TwoColumnLayout.propTypes = {
  ...SingleLayout.propTypes,
  rightClassName: classes,
  leftClassName: classes
}

TwoColumnLayout.defaultProps = {
  ...SingleLayout.defaultProps,
  leftClassName: 'one',
  rightClassName: 'one'
}

const TwoColumn2rowLayout = ({ background, fullWidth, paddingBottom, paddingTop, children, leftClassName, rightClassName, order }) => {
  const [first, second, third] = children ? [].concat(children) : []

  return (
    <main>
      <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className={`content-item items ${order}`}>
            <div className="content-child full">
              {first}
            </div>
            <div className="content-child full items">
              <div className={`content-child left ${leftClassName}`}>
                {second}
              </div>
              <div className={`content-child right ${rightClassName}`}>
                {third}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

TwoColumn2rowLayout.propTypes = {
  ...SingleLayout.propTypes,
  children: PropTypes.Array,
  leftClassName: PropTypes.string,
  rightClassName: PropTypes.string,
  order: PropTypes.string
}

const ThreeColumnLayout = ({ background, fullWidth, paddingBottom, paddingTop, children, leftClassName, middleClassName, rightClassName }) => {
  const [first, second, third] = children ? [].concat(children) : []

  return (
    <main>
      <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className="content-item items">
            <div className={`content-child left ${leftClassName}`}>
              {first}
            </div>
            <div className={`content-child middle ${middleClassName}`}>
              {second}
            </div>
            <div className={`content-child right ${rightClassName}`}>
              {third}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

ThreeColumnLayout.propTypes = {
  ...SingleLayout.propTypes,
  rightClassName: classes,
  middleClassName: classes,
  leftClassName: classes
}

ThreeColumnLayout.defaultProps = {
  ...SingleLayout.defaultProps,
  middleClassName: 'one-33',
  leftClassName: 'one-33',
  rightClassName: 'one-33'
}

const ThreeColumn2rowLayout = ({ background, fullWidth, paddingBottom, paddingTop, children, leftClassName, middleClassName, rightClassName, order }) => {
  const [first, second, third, fourth] = children ? [].concat(children) : []

  return (
    <main>
      <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className={`content-item items ${order}`}>
            <div className="content-child full">
              {first}
            </div>

            <div className="content-child full items">
              <div className={`content-child left ${leftClassName}`}>
                {second}
              </div>
              { third && (
                <div className={`content-child middle ${middleClassName}`}>
                  {third}
                </div>
              )}
              { fourth && (
                <div className={`content-child right ${rightClassName}`}>
                  {fourth}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

ThreeColumn2rowLayout.propTypes = {
  ...ThreeColumnLayout.propTypes,
  order: PropTypes.oneOf(['', 'reverse'])
}

ThreeColumn2rowLayout.defaultProps = {
  ...ThreeColumnLayout.defaultProps,
  order: ''
}

const FourColumnLayout = ({ background, fullWidth, paddingBottom, paddingTop, children, leftClassName, middleLeftClassName, middleRightClassName, rightClassName }) => {
  const [first, second, third, fourth] = children ? [].concat(children) : []

  return (
    <main>
      <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className="content-item items">
            <div className={`content-child left ${leftClassName}`}>
              {first}
            </div>
            { second && (
              <div className={`content-child middle ${middleLeftClassName}`}>
                {second}
              </div>
            )}
            { third && (
              <div className={`content-child middle ${middleRightClassName}`}>
                {third}
              </div>
            )}
            { fourth && (
              <div className={`content-child right ${rightClassName}`}>
                {fourth}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

FourColumnLayout.propTypes = {
  ...SingleLayout.propTypes,
  middleLeftClassName: classes,
  middleRightClassName: classes,
  leftClassName: classes,
  rightClassName: classes
}

FourColumnLayout.defaultProps = {
  ...SingleLayout.defaultProps,
  middleLeftClassName: 'one-25',
  middleRightClassName: 'one-25',
  leftClassName: 'one-25',
  rightClassName: 'one-25'
}

const FourColumn2rowLayout = ({ background, fullWidth, paddingBottom, paddingTop, children, leftClassName, middleLeftClassName, middleRightClassName, rightClassName, order }) => {
  const [first, second, third, fourth, fifth] = children ? [].concat(children) : []

  return (
    <main>
      <div className={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div className={`content${fullWidth ? ' full' : ''}`}>
          <div className={`content-item items ${order}`}>
            <div className="content-child full">
              {first}
            </div>

            <div className="content-child full items">
              <div className={`content-child left ${leftClassName}`}>
                {second}
              </div>
              { third && (
                <div className={`content-child middle ${middleLeftClassName}`}>
                  {third}
                </div>
              )}
              { fourth && (
                <div className={`content-child middle ${middleRightClassName}`}>
                  {fourth}
                </div>
              )}
              { fifth && (
                <div className={`content-child right ${rightClassName}`}>
                  {fifth}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

FourColumn2rowLayout.propTypes = {
  ...FourColumnLayout.propTypes,
  order: PropTypes.oneOf(['', 'reverse'])
}

FourColumn2rowLayout.defaultProps = {
  ...FourColumnLayout.defaultProps,
  order: ''
}

export default SingleLayout

export {
  SingleLayout,
  SingleColumn2row,
  TwoColumnLayout,
  TwoColumn2rowLayout,
  ThreeColumnLayout,
  ThreeColumn2rowLayout,
  FourColumnLayout,
  FourColumn2rowLayout
}
