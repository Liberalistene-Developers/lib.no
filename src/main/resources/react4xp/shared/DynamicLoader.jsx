import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import doGuillotineRequest from '../../headless/guillotineRequest'

import Button from '../libEntries/Button'

let nextOffset = 0

export const DynamicLoader = ({
  apiUrl = '',
  buildQueryList,
  children,
  count = 10,
  extractList,
  items,
  loadMoreEnabled = false,
  loadMore = 'Load more',
  parentPathQuery = '',
  sortExpression = ''
}) => {
  const [list, setList] = useState(items)
  const [more, setMore] = useState(loadMoreEnabled && apiUrl && items.length === count)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    nextOffset = list.length
  }, [list])

  const updateItems = (data) => {
    if (data.length > 0) {
      nextOffset += data.length

      setList([
        ...list,
        ...data
      ])

      if (data.length < count) {
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

      query: buildQueryList(),

      variables: {
        first: count,
        offset: nextOffset,
        sort: sortExpression,
        parentPathQuery
      },

      extractDataFunc: extractList,

      handleDataFunc: updateItems
    })
  }

  const button = more && (
    <div className="more-button">
      <Button title={loadMore} onClick={!loading && readMoreClick} />
    </div>
  )

  return (
    <>
      {children({ items: list, children: button })}
    </>
  )
}

DynamicLoader.propTypes = {
  apiUrl: PropTypes.string,
  buildQueryList: PropTypes.func,
  count: PropTypes.number,
  children: PropTypes.func,
  extractList: PropTypes.func,
  items: PropTypes
    .arrayOf(PropTypes
      .shape({
        id: PropTypes.string
      })),
  loadMore: PropTypes.string,
  loadMoreEnabled: PropTypes.bool,
  parentPathQuery: PropTypes.string,
  sortExpression: PropTypes.string
}

DynamicLoader.defaultProps = {
  apiUrl: '',
  items: [],
  loadMore: '',
  loadMoreEnabled: false
}

export default (props) => <DynamicLoader {...props} /> // eslint-disable-line react/display-name
