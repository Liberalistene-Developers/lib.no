import React from 'react'
import PropTypes from 'prop-types'

import { GridItem } from './GridItem'
import { AuthorLink } from './AuthorLink'

export const ArticleCard = ({
  className,
  imageSize,
  imageType,
  item,
  item: {
    authors = [],
    datePublished
  } = {},
  readMore,
  readMoreEnabled,
  noIngress = false,
  showAuthors = true
}) => (
  <GridItem className={className} showImage item={item} noIngress={noIngress} childrenLast={true} readMore={readMore} readMoreEnabled={readMoreEnabled}>
    <div className="article-creds">
      { showAuthors && authors && authors.length > 0 && (
        <ul className="authors">
          { authors.slice(0, 1).map(({ authorID, person, personUrl, image }) => (
            <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
          ))}
        </ul>
      )}
      { datePublished && (
        <div className="article-date">
          {datePublished}
        </div>
      )}
    </div>
  </GridItem>
)

ArticleCard.propTypes = {
  children: PropTypes.array,
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
  readMore: PropTypes.string,
  readMoreEnabled: PropTypes.bool,
  noIngress: PropTypes.bool
}

ArticleCard.defaultProps = {
  showImage: true,
  imageSize: 'medium',
  imageType: undefined,
  item: undefined,
  showAuthors: true
}

const DefaultArticleCard = (props) => <ArticleCard {...props} />
DefaultArticleCard.displayName = 'ArticleCard'

export default DefaultArticleCard
