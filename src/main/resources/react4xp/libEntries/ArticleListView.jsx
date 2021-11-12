import React from 'react'
import PropTypes from 'prop-types'

import Image from '../shared/Image'

import ListItem from '../shared/ArticleListItem'
import GridItem from '../shared/ArticleCard'

export const ArticleListView = ({
  children,
  featured,
  description,
  displaytype,
  image,
  shortDescription,
  items,
  tags,
  title,
  readMore,
  readMoreEnabled,
  showImage,
  imageType,
  imageSize,
  titleCenter = false,
  noIngress = false
}) => {
  const Item = displaytype === 'list' ? ListItem : GridItem

  return (
    <div className="article-list-holder">
      { title && (
        <div className="article-list-title">
          <h2 title={title}>{title}</h2>
        </div>
      )}

      <Image image={image} />

      { shortDescription && (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )}

      { description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}

      { items && items.length > 0 && (
        <div className={`article-list ${displaytype}`}>
          { items.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              presentation={(featured && featured[`${index + 1}`]) || false}
              direction={(featured && featured[`${index + 1}`] && featured[`${index + 1}`].style) || ''}
              showDate={(featured && featured[`${index + 1}`] && featured[`${index + 1}`].showDate) || false}
              titleCenter={titleCenter}
              showImage={showImage}
              imageSize={imageSize}
              imageType={imageType}
              className="article"
              readMore={readMore}
              readMoreEnabled={readMoreEnabled}
              noIngress={noIngress}
            />
          ))}
        </div>
      )}
      { children }
    </div>
  )
}

ArticleListView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  description: PropTypes.string,
  displaytype: PropTypes.string,
  featured: PropTypes.object,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  imageSize: PropTypes.string,
  imageType: PropTypes.string,
  items: PropTypes
    .arrayOf(PropTypes
      .shape({
        id: PropTypes.string
      })),
  noIngress: PropTypes.bool,
  readMore: PropTypes.string,
  readMoreEnabled: PropTypes.bool,
  shortDescription: PropTypes.string,
  showImage: PropTypes.bool,
  tags: PropTypes.array,
  title: PropTypes.string,
  titleCenter: PropTypes.bool
}

export default (props) => <ArticleListView {...props} /> // eslint-disable-line react/display-name
