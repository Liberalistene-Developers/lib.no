import React from 'react'
import PropTypes from 'prop-types'

import { ImageBlock } from './ImageBlock'
import { AuthorLink } from '../shared/AuthorLink'

export const Article = ({
  headerColor,
  headerPosition,
  title,
  titleInImage,
  image,
  authors,
  ingress,
  ingressInImage,
  text,
  tags,
  datePublished
}) => (
  <div className="article">
    <ImageBlock
      title={titleInImage && [{ title, titleColor: headerColor }]}
      image={image}
      ingress={ingressInImage && ingress}
      position={headerPosition}
    />

    <div className="article-title">
      { !titleInImage && title && (
        <h1>{title}</h1>
      )}
    </div>

    <div className="article-creds">
      { authors && authors.length > 0 && (
        <ul className="authors">
          { authors.map(({ authorID, person, personUrl, image }) => (
            <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
          ))}
        </ul>
      )}
      <div className="article-date">
        {datePublished}
      </div>
    </div>

    <div className="page-content">
      { !ingressInImage && ingress && (
        <div className="ingress rich-text" dangerouslySetInnerHTML={{ __html: ingress }} />
      )}

      { text && (
        <div dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </div>
  </div>
)

Article.propTypes = {
  authors: PropTypes.arrayOf({
    authorID: PropTypes.string,
    person: PropTypes.string,
    personUrl: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string
    })
  }),
  datePublished: PropTypes.string,
  description: PropTypes.string,
  headerColor: PropTypes.string,
  headerPosition: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  ingress: PropTypes.string,
  ingressInImage: PropTypes.bool,
  tags: PropTypes.array,
  text: PropTypes.string,
  title: PropTypes.string,
  titleInImage: PropTypes.bool
}

Article.defaultProps = {
  description: '',
  ingressInImage: true,
  title: '',
  titleInImage: true
}

const DefaultArticle = (props) => <Article {...props} />
DefaultArticle.displayName = 'Article'

export default DefaultArticle
