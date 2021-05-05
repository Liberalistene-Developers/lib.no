import React from 'react'
import PropTypes from 'prop-types'

import { buildQueryArticleList, extractArticleList } from '../../headless/helpers/articleListRequests'

import { ArticleListView } from './ArticleListView'
import { DynamicLoader } from '../shared/DynamicLoader'

export const ArticleList = ({
  featured,
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
  titleCenter = false,
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
  if (window === undefined) {
    return (
      <ArticleListView
        featured={featured}
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
        titleCenter={titleCenter}
        readMore={readMore}
        readMoreEnabled={readMoreEnabled}
        noIngress={noIngress}
      />
    )
  }

  return (
    <DynamicLoader
      apiUrl={apiUrl}
      buildQueryList={buildQueryArticleList}
      count={count}
      extractList={extractArticleList}
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
        <ArticleListView
          featured={featured}
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
          titleCenter={titleCenter}
          readMore={readMore}
          readMoreEnabled={readMoreEnabled}
          noIngress={noIngress}
        >
          {readMoreButton}
        </ArticleListView>
      )}
    </DynamicLoader>
  )
}

ArticleList.propTypes = {
  apiUrl: PropTypes.string,
  count: PropTypes.number,
  description: PropTypes.string,
  displaytype: PropTypes.string,
  featured: PropTypes.object,
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
  tags: PropTypes.array,
  title: PropTypes.string,
  titleCenter: PropTypes.bool
}

ArticleList.defaultProps = {
  featured: {},
  tags: [],
  titleCenter: false
}

export default (props) => <ArticleList {...props} /> // eslint-disable-line react/display-name
