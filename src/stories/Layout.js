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

export default SingleLayout;

export {
  SingleLayout,
}