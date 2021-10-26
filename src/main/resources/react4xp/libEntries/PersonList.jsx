import React from 'react'
import PropTypes from 'prop-types'

import GridItem from '../shared/GridItem'
import Image from '../shared/Image'
import ListItem from '../shared/ListItem'

export const PersonList = ({
  description,
  displaytype,
  image,
  shortDescription,
  imagesize,
  imagetype,
  items,
  tags,
  title
}) => {
  const Item = displaytype === 'list' ? ListItem : GridItem

  return (
    <div className="person-list-holder">
      { title && (
        <h2 title={title}>{title}</h2>
      )}

      <Image image={image} />

      { shortDescription && (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )}

      { description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}

      { items && items.length > 0 && (
        <div className={`person-list ${displaytype}`}>
          { items.map((item) => (
            <Item
              key={item.itemID}
              item={item}
              imageSize={imagesize}
              imageType={(imagetype && 'round') || ''}
            />
          ))}
        </div>
      )}
    </div>
  )
}

PersonList.propTypes = {
  description: PropTypes.string,
  displaytype: PropTypes.string,
  className: PropTypes.string,
  imagesize: PropTypes.oneOf(['small', 'medium', 'large']),
  imagetype: PropTypes.bool,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string
  })),
  shortDescription: PropTypes.string,
  showImage: PropTypes.bool,
  tags: PropTypes.array,
  title: PropTypes.string
}

PersonList.defaultProps = {
  showImage: true,
  imageSize: 'medium',
  imageType: undefined,
  item: undefined
}

export default (props) => <PersonList {...props} />// eslint-disable-line react/display-name
