const contentLib = require('/lib/xp/content')

const getChildren = (search) => contentLib.getChildren(search)

export const findChildren = (search, contentType) => {
  const children = getChildren(search)

  return (
    children.count &&
    children.hits.filter(({ type }) => (type ? type === contentType : true))
  )
}

export const getItems = (search, contentType) => {
  // log.info(JSON.stringify(children, null, 4));

  const items = findChildren(search, contentType)

  if (!items) {
    return items
  }

  return items.map(({ _id: key }) => key)
}

export const runQuery = (
  key,
  count,
  type,
  sortMethod = undefined,
  start = 0
) => {
  const sort = sortMethod ? `_modifiedTime ${sortMethod}` : undefined

  const search = {
    key,
    start,
    count,
    sort
  }

  return getItems(search, type)
}

export const findItems = (type, key, sort, count, start = 0) => {
  switch (sort) {
    case 'normal': {
      const list = runQuery(key, count, type, undefined, 0)

      return list
    }

    default: {
      const list = runQuery(
        key,
        count,
        type,
        sort === 'asc' ? 'ASC' : 'DESC',
        0
      )

      return list
    }
  }
}
