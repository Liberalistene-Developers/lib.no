export const buildQueryArticleList = () => `
query(
    $first: Int,
    $offset: Int,
    $sort: String,
    $parentPathQuery: String
) {
  guillotine {
    query(
        contentTypes: ["lib.no:article"],
        query: $parentPathQuery,
        first: $first,
        offset: $offset,
        sort: $sort
    ) {
      ... on lib_no_Article {
        id: _id
        url: pageUrl
        name: displayName

        data {
          datePublished: date
          shortDescription: ingress
          image {
            ... on media_Image {
              data {
                alternativeText: caption
              }
              url: imageUrl(type: absolute, filter: "rounded(3)", scale: "block(459,295)")
            }
          }
        }
      }
    }
  }
}
`

export const extractArticleList = (responseData) => {
  const {
    data: {
      guillotine: {
        query = []
      } = {}
    } = {}
  } = responseData || {}

  const imageMap = ({ url, data: { alternativeText } }) => ({
    url,
    alternativeText
  })

  const map = ({
    id,
    name,
    url,
    data: {
      datePublished,
      shortDescription,
      image
    } = {}
  }) => ({
    id,
    name,
    url,
    datePublished,
    shortDescription,
    image: image && imageMap(image)
  })

  return query
    .filter(item => item && typeof item === 'object' && item.data)
    .map(map)
}

export default {
  buildQueryArticleList,
  extractArticleList
}
