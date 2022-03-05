import { extractList } from './helpers'

export const buildQueryMemberList = () => `
query(
    $first: Int,
    $offset: Int,
    $sort: String,
    $parentPathQuery: String
) {
  guillotine {
    query(
        contentTypes: ["lib.no:product"],
        query: $parentPathQuery,
        first: $first,
        offset: $offset,
        sort: $sort
    ) {
      ... on lib_no_Product {
        id: _id
        url: pageUrl
        name: displayName

        data {
          shortDescription: ingress
          price
          active
          image {
            ... on media_Image {
              displayName
              data {
                alternativeText: caption
              }
              url: imageUrl(type: absolute, scale: "block(50,50)")
            },
            ... on media_Vector {
              displayName
              data {
                alternativeText: caption
              }
              url: mediaUrl
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
    shortDescription,
    price,
    active,
    image
  } = {}
}) => ({
  id,
  name,
  url,
  price,
  active,
  shortDescription,
  image: image && imageMap(image)
})

export const extractMemberList = extractList(map)

export default {
  buildQueryMemberList,
  extractMemberList
}
