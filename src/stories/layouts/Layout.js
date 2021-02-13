import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SingleLayout = ({ background, fullWidth, paddingBottom, paddingTop, children }) => (
  <main>
    <div class={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
      <div class={`content${fullWidth?' full':''}`}>
        <div class="content-item">
          {children}
        </div>
      </div>
    </div>
  </main>
);


SingleLayout.propTypes = {
  background: PropTypes.oneOf(['standard', 'white', 'purple', 'yellow']),
  fullWidth: PropTypes.bool,
  paddingBottom: PropTypes.bool,
  paddingTop: PropTypes.bool,
};

SingleLayout.defaultProps = {
  background: 'standard',
  fullWidth: false,
  paddingBottom: false,
  paddingTop: false,
};


const SingleColumn2row = ({ background, fullWidth, paddingBottom, paddingTop, children, order}) => {
  const [first, second] = children ? [].concat(children) : [];

  return (
    <main>
      <div class={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div class={`content${fullWidth?' full':''}`}>
          <div class={`content-item items ${order}`}>
            <div class="content-child full">
              {first}
            </div>
            <div class="content-child full">
              {second}
            </div>          
          </div>
        </div>
      </div>
    </main>
  );
};

SingleColumn2row.propTypes = {
  ...SingleLayout.propTypes,
  order: PropTypes.string,
};

SingleColumn2row.defaultProps = {
  ...SingleLayout.defaultProps,
  order: '',
};


const TwoColumnLayout = ({ background, fullWidth, paddingBottom, paddingTop, children, leftClassName, rightClassName }) => {
  const [first, second] = children ? [].concat(children) : [];
  
  return (
    <main>
      <div class={ classNames('content-holder', `${background}`, { 'padding-bottom': paddingBottom, 'padding-top': paddingTop }) }>
        <div class={`content${fullWidth?' full':''}`}>
          <div class="content-item items">
            <div class={`content-child left ${leftClassName}`}>
              {first}
            </div>
            <div class={`content-child right ${rightClassName}`}>
              {second}
            </div>          
          </div>
        </div>
      </div>
    </main>
  );
};
const classes = PropTypes.oneOf(['', 'one', 'one-20', 'one-30', 'one-33', 'one-40', 'two-60', 'two-66', 'two-70', 'four']);

TwoColumnLayout.propTypes = {
  ...SingleLayout.propTypes,
  rightClassName: classes,
  leftClassName: classes,
};

TwoColumnLayout.defaultProps = {
  ...SingleLayout.defaultProps,
  leftClassName: 'one',
  rightClassName: 'one',
};

export default SingleLayout;

export {
  SingleLayout,
  SingleColumn2row,
  TwoColumnLayout,
}