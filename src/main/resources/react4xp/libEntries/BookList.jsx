import React from 'react'
import PropTypes from 'prop-types'

import { BookCard } from './BookCard'

/**
 * Primary Image holder for solution.
 */
export const BookList = ({
  title,
  items = [],
  className,
  buyFromText
}) => {
  return (
    <div className="bookcard-list-wrapper">
      { title && (
        <div className="bookcard-list-title">
          <h2>{title}</h2>
        </div>
      )}

      <div className={`bookcard-list ${className}`}>
        { items && items.map(({
          itemID,
          url,
          image,
          author,
          title,
          text,
          buy
        }) => (
          <BookCard
            key={itemID}
            image={image}
            author={author}
            title={title}
            text={text}
            url={url}
            buy={buy}
            buyFromText={buyFromText}
          />
        ))}
      </div>
    </div>
  )
}

BookList.propTypes = {
  title: PropTypes.string,
  buyFromText: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    }),
    image: PropTypes.shape({
      url: PropTypes.string,
      alternativeText: PropTypes.string
    }),
    buy: PropTypes.shape({
      url: PropTypes.string,
      shop: PropTypes.string
    }),
    title: PropTypes.string,
    text: PropTypes.string
  }))
}

BookList.defaultProps = {
  title: '',
  buyFromText: '',
  className: '',
  items: []
}

export default (props) => <BookList {...props} /> // eslint-disable-line react/display-name
