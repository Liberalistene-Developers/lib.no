import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import doGuillotineRequest from '../../headless/guillotineRequest'
import { buildQueryEventList, extractEventList } from '../../headless/helpers/eventListRequests'

import Image from '../shared/Image'

import ListItem from '../shared/EventListItem'
import GridItem from '../shared/EventCard'

import Button from './Button'

let nextOffset = 0

export const EventList = ({
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
  loadMoreEnabled = false,
  loadMore = 'Load more',
  apiUrl = '',
  count = 10,
  sortExpression = '',
  parentPathQuery = '',
  noIngress = false
}) => {
  const [list, setList] = useState(items)
  const [more, setMore] = useState(loadMoreEnabled && apiUrl && items.length === count)
  const [loading, setLoading] = useState(false)

  const Item = displaytype === 'list' ? ListItem : GridItem

  useEffect(() => {
    nextOffset = list.length
  }, [list])

  const updateEvents = (events) => {
    if (events.length > 0) {
      nextOffset += events.length

      setList([
        ...list,
        ...events
      ])

      if (events.length < count) {
        setMore(false)
      }
    } else {
      setMore(false)
    }

    setLoading(false)
  }

  const readMoreClick = () => {
    setLoading(loading)

    doGuillotineRequest({
      url: apiUrl,

      query: buildQueryEventList(),

      variables: {
        first: count,
        offset: nextOffset,
        sort: sortExpression,
        parentPathQuery
      },

      extractDataFunc: extractEventList,

      handleDataFunc: updateEvents
    })
  }

  return (
    <div className="events-list-wrapper">
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

      { list && list.length > 0 && (
        <div className={`events-list ${displaytype}`}>
          { list.map(({ id, url, title, image, text, location, date, to }) => (
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
      { more && (
        <div className="more-button">
          <Button title={loadMore} onClick={!loading && readMoreClick} />
        </div>
      )}
    </div>
  )
}

EventList.propTypes = {
  apiUrl: PropTypes.string,
  count: PropTypes.number,
  description: PropTypes.string,
  displaytype: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  imageSize: PropTypes.string,
  imageType: PropTypes.string,
  items: PropTypes.arrayOf({
    id: PropTypes.string
  }),
  loadMore: PropTypes.string,
  loadMoreEnabled: PropTypes.bool,
  noIngress: PropTypes.bool,
  parentPathQuery: PropTypes.string,
  readMore: PropTypes.string,
  readMoreEnabled: PropTypes.bool,
  shortDescription: PropTypes.string,
  showImage: PropTypes.bool,
  sortExpression: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array
}

EventList.defaultProps = {
  tags: []
}

export default (props) => <EventList {...props} /> // eslint-disable-line react/display-name
