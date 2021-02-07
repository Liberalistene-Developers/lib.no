import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

import ListItem from './ListItem';

export const PersonListItem = ({
  imageSize,
  imageType,
  item,
  item: {
    role,
  } = {},
  fields,
}) => (
  <ListItem item={item} imageSize={imageSize} imageType={imageType} fields={fields} className="person">
    { role && (
      <span className="role">{role}</span>
    )}
  </ListItem>
);

PersonListItem.propTypes = {
  ...ListItem.propTypes,
  item: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    role: PropTypes.string,
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string,
  }),
};

PersonListItem.defaultProps = {
  ...ListItem.defaultProps,
};

export default PersonListItem;