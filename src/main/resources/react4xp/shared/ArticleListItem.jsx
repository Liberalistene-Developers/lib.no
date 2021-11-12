import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import { ListItem } from './ListItem'
import { AuthorLink } from './AuthorLink'

export const ArticleListItem = ({
  className,
  showImage,
  imageSize,
  imageType,
  item,
  item: {
    authors = [],
    datePublished
  } = {},
  showAuthors = false,
  showDate = true
}) => (
  <ListItem className={cx('article', className)} imageSize={imageSize} imageType={imageType} showImage={showImage} item={item} childrenLast={true}>
    <div className="article-creds">
      { showAuthors && authors && authors.length > 0 && (
        <ul className="authors">
          { authors.slice(0, 1).map(({ authorID, person, personUrl, image }) => (
            <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
          ))}
        </ul>
      )}
      { datePublished && showDate && (
        <div className="article-date">
          {datePublished}
        </div>
      )}
    </div>
  </ListItem>
)

ArticleListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  childrenLast: PropTypes.bool,
  className: PropTypes.string,
  imageSize: PropTypes.oneOf(['small', 'medium', 'large']),
  imageType: PropTypes.oneOf(['round', '']),
  showImage: PropTypes.bool,
  item: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    authors: PropTypes.array,
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string
  }),
  showAuthors: PropTypes.bool,
  showDate: PropTypes.bool
}

ArticleListItem.defaultProps = {
  showImage: true,
  imageSize: 'medium',
  imageType: undefined,
  item: undefined,
  showAuthors: false,
  showDate: true
}

export default (props) => <ArticleListItem {...props} /> // eslint-disable-line react/display-name
