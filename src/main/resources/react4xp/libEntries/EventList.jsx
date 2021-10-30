import React from 'react'
import PropTypes from 'prop-types'

import { buildQueryEventList, extractEventList } from '../../headless/helpers/eventListRequests'

import { EventListView } from './EventListView'
import { DynamicLoader } from '../shared/DynamicLoader'

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
  noIngress = false,
  useLoader = false
}) => {
  if (window === undefined || !useLoader) {
    return (
      <EventListView
        description={description}
        displaytype={displaytype}
        image={image}
        shortDescription={shortDescription}
        items={items}
        tags={tags}
        title={title}
        showImage={showImage}
        imageSize={imageSize}
        imageType={imageType}
        readMore={readMore}
        readMoreEnabled={readMoreEnabled}
        noIngress={noIngress}
      />
    )
  }

  return (
    <DynamicLoader
      apiUrl={apiUrl}
      buildQueryList={buildQueryEventList}
      count={count}
      extractList={extractEventList}
      items={items}
      loadMoreEnabled={loadMoreEnabled}
      loadMore={loadMore}
      parentPathQuery={parentPathQuery}
      sortExpression={sortExpression}
    >
      { ({
        items: list,
        children: readMoreButton
      }) => (
        <EventListView
          description={description}
          displaytype={displaytype}
          image={image}
          shortDescription={shortDescription}
          items={list}
          tags={tags}
          title={title}
          showImage={showImage}
          imageSize={imageSize}
          imageType={imageType}
          readMore={readMore}
          readMoreEnabled={readMoreEnabled}
          noIngress={noIngress}
        >
          {readMoreButton}
        </EventListView>
      )}
    </DynamicLoader>
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
  items: PropTypes
    .arrayOf(PropTypes
      .shape({
        id: PropTypes.string
      })),
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
  tags: PropTypes.array,
  useLoader: PropTypes.bool
}

EventList.defaultProps = {
  items: [],
  tags: [],
  useLoader: false
}

export default (props) => <EventList {...props} /> // eslint-disable-line react/display-name
