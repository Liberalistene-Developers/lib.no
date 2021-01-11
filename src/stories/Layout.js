import React from 'react';
import PropTypes from 'prop-types';

const SingleLayout = ({ fullWidth, background, children }) => (
  <main>
    <div class={`content-holder ${background}`}>
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
};

SingleLayout.defaultProps = {
  background: 'standard',
  fullWidth: false,
};

export default SingleLayout;

export {
  SingleLayout,
}