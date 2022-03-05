import { extractList } from './helpers'

export const buildQueryEventList = () => `
query(
    $first: Int,
    $offset: Int,
    $sort: String,
    $parentPathQuery: String
) {
  guillotine {
    query(
        contentTypes: ["lib.no:event"],
        query: $parentPathQuery,
        first: $first,
        offset: $offset,
        sort: $sort
    ) {
      ... on lib_no_Event {
        id: _id
        url: pageUrl
        name: displayName

        data {
          from
          to
          place
          shortDescription: ingress
          image {
            ... on media_Image {
              displayName
              data {
                alternativeText: caption
              }
              url: imageUrl(type: absolute, filter: "", scale: "block(459,295)")
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
    from,
    to,
    place,
    shortDescription,
    image
  } = {}
}) => ({
  id,
  title: name,
  url,
  date: from,
  to,
  location: {
    address: place
  },
  text: shortDescription,
  image: image && imageMap(image)
})

export const extractEventList = extractList(map)

export default {
  buildQueryEventList,
  extractEventList
}
