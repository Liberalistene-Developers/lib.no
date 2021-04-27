import React from 'react'
import PropTypes from 'prop-types'

export const OrganizationalPosition = ({
  title,
  description,
  shortDescription,
  tags
}) => (
  <div>
    <h1 title={title}>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </div>
)

OrganizationalPosition.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  shortDescription: PropTypes.string,
  tags: PropTypes.array
}

export default (props) => <OrganizationalPosition {...props} /> // eslint-disable-line react/display-name
