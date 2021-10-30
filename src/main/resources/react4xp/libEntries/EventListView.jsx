import React from 'react'
import PropTypes from 'prop-types'

import Image from '../shared/Image'

import ListItem from '../shared/EventListItem'
import GridItem from '../shared/EventCard'

export const EventListView = ({
  children,
  description,
  displaytype,
  image,
  shortDescription,
  items,
  tags,
  title,
  showImage,
  imageType,
  imageSize,
  readMore = '',
  readMoreEnabled = false,
  noIngress = false
}) => {
  const Item = displaytype === 'list' ? ListItem : GridItem

  return (
    <div className="events-list-wrapper">
      { title && (
        <div className="events-list-title">
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
        <div className={`events-list ${displaytype}`}>
          { items.map(({ id, url, title, image, text, location, date, to }) => (
            <Item
              key={id}
              title={title}
              image={image}
              text={text}
              location={location}
              date={date}
              to={to}
              url={url}
              showImage={showImage}
              imageSize={imageSize}
              imageType={imageType}
              className="event"
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

EventListView.propTypes = {
  children: PropTypes.object,
  description: PropTypes.string,
  displaytype: PropTypes.string,
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
  parentPathQuery: PropTypes.string,
  readMore: PropTypes.string,
  readMoreEnabled: PropTypes.bool,
  shortDescription: PropTypes.string,
  showImage: PropTypes.bool,
  title: PropTypes.string,
  tags: PropTypes.array
}

EventListView.defaultProps = {
  items: [],
  tags: []
}

export default (props) => <EventListView {...props} /> // eslint-disable-line react/display-name
