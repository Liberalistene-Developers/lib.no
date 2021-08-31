import React from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem'

export const PersonListItem = ({
  imageSize,
  imageType,
  item,
  item: {
    role,
    email
  } = {},
  showRole = true,
  showEmail = false,
  fields
}) => (
  <ListItem item={item} imageSize={imageSize} imageType={imageType} fields={fields} className="person">
    <>
      { showRole && role && (
        <span className="role">{role}</span>
      )}
      { showEmail && email && (
        <a href={`mailto:${email}`} rel="noreferrer">{email}</a>
      )}
    </>
  </ListItem>
)

PersonListItem.propTypes = {
  ...ListItem.propTypes,
  item: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    role: PropTypes.string,
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string
  })
}

PersonListItem.defaultProps = {
  ...ListItem.defaultProps
}

export default (props) => <PersonListItem {...props} /> // eslint-disable-line react/display-name
