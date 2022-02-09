
import PropTypes from 'prop-types'

import { GridItem } from './GridItem'
import { AuthorLink } from './AuthorLink'

export const ArticleCard = ({
  className,
  direction = 'left',
  imageSize,
  imageType,
  item,
  item: {
    authors = [],
    datePublished
  } = {},
  noIngress = false,
  presentation = false,
  readMore,
  readMoreEnabled,
  showAuthors = true,
  showDate = true,
  titleCenter = false
}) => (
  <GridItem className={className} presentation={presentation} direction={direction} titleCenter={titleCenter} showImage item={item} noIngress={noIngress} childrenLast={true} readMore={readMore} readMoreEnabled={readMoreEnabled}>
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
  </GridItem>
)

ArticleCard.propTypes = {
  children: PropTypes.array,
  childrenLast: PropTypes.bool,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['left', 'right', '', undefined]),
  imageSize: PropTypes.oneOf(['small', 'medium', 'large']),
  imageType: PropTypes.oneOf(['round', '']),
  item: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    authors: PropTypes.array,
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string
  }),
  noIngress: PropTypes.bool,
  presentation: PropTypes.bool,
  readMore: PropTypes.string,
  readMoreEnabled: PropTypes.bool,
  showAuthors: PropTypes.bool,
  showDate: PropTypes.bool,
  showImage: PropTypes.bool,
  titleCenter: PropTypes.bool
}

ArticleCard.defaultProps = {
  imageSize: 'medium',
  imageType: undefined,
  item: undefined,
  presentation: false,
  direction: '',
  showAuthors: true,
  showDate: true,
  showImage: true,
  titleCenter: false
}

export default (props) => <ArticleCard {...props} />// eslint-disable-line react/display-name
