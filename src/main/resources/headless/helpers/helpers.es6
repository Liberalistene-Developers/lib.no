export const buildParentPathQuery = (parentPath) => `_parentPath = '/content${parentPath}'`

// If arg is falsy, returns an empty array.
export const forceArray = maybeArray => maybeArray ? [].concat(maybeArray) : []

export const extractList = (map) => (responseData) => {
  const {
    data: {
      guillotine: {
        query = []
      } = {}
    } = {}
  } = responseData || {}

  const imageMap = ({ url, data: { alternativeText } = {} }) => ({
    url,
    alternativeText
  })

  return query
    .filter(item => item && typeof item === 'object' && item.data)
    .map(map(imageMap))
}
