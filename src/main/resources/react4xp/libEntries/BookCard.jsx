import PropTypes from 'prop-types'

/**
 * Primary Image holder for solution.
 */
export const BookCard = ({
  url,
  image,
  author,
  title,
  text,
  buy,
  buyFromText
}) => {
  const imageItem = image && (<img src={image.url} alt={image.alternativeText || image.displayName || title || (image.url && image.url.split('?')[0].split('/').pop())} className="bookcard-image" />)
  const buyAtStoreText = (buy && (buy.store || buy.topic)) ? `${buyFromText} ${buy.store || buy.topic}` : buyFromText
  const imageContainer = image && ((buy && buy.url) || url)
    ? (
    <a href={(buy && buy.url) || url} title={buyAtStoreText}>
      {imageItem}
    </a>
      )
    : imageItem

  const titleItem = <h3 className="bookcard-title">{title}</h3>
  const titleContainer = url
    ? (
    <a href={url}>
      {titleItem}
    </a>
      )
    : titleItem

  return (
    <div className="bookcard-holder">
      { image && (
        <div className="bookcard-image">
          {imageContainer}
        </div>
      )}
      <div className="bookcard-content">
        <div className="bookcard-title">
          { titleContainer }
        </div>

        <div className="bookcard-author">
          {author && author.name}
        </div>

        { text && (
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: text }} />
        )}

        { buy && (
          <div className="bookcard-buy">
            <a href={buy.url} rel="noreferrer">{buyAtStoreText}</a>
          </div>
        )}
      </div>
    </div>
  )
}

BookCard.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),
  image: PropTypes.shape({
    url: PropTypes.string,
    displayName: PropTypes.string,
    alternativeText: PropTypes.string
  }),

  buy: PropTypes.shape({
    url: PropTypes.string,
    store: PropTypes.string,
    topic: PropTypes.string
  }),

  buyFromText: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string
}

BookCard.defaultProps = {
  author: '',
  image: null,
  buy: null,
  text: '',
  title: '',
  buyFromText: '',
  url: ''
}

export default (props) => <BookCard {...props} /> // eslint-disable-line react/display-name
