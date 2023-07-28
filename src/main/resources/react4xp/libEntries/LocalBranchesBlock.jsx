import PropTypes from 'prop-types'

import cx from 'classnames'

export const LocalBranchesBlock = ({
  headingClassName,
  items,
  title
}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="localbranches">
      <div className={cx('heading', headingClassName)}><h2>{title}</h2></div>
      <div className="items">
        { items && items.map(({ name, path }) => (<div key={title}><a href={path} title={name}>{name}</a></div>))}
      </div>
    </div>
  )
}

LocalBranchesBlock.propTypes = {
  headingClassName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.url
  })),
  title: PropTypes.string
}

LocalBranchesBlock.defaultProps = {
  headingClassName: '',
  items: []
}

export default (props) => <LocalBranchesBlock {...props} />// eslint-disable-line react/display-name
