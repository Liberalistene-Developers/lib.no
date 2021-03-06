import { extractList } from './helpers'

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

const map = (imageMap) => ({
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

export const extractArticleList = extractList(map)

export default {
  buildQueryArticleList,
  extractArticleList
}
