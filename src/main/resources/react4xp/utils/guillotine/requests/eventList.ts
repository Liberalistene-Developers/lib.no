import {extractList} from '/react4xp/utils/guillotine/helpers';
import {type ImageData, type ImageMapper} from '/react4xp/utils/image';

interface EventData {
  id?: string;
  title?: string;
  url?: string;
  date?: string;
  to?: string;
  location?: {
    address?: string;
  };
  text?: string;
  image?: ImageData;
  [key: string]: unknown;
}

interface GuillotineEventItemRaw {
  id?: string;
  name?: string;
  url?: string;
  data?: {
    from?: string;
    to?: string;
    place?: string;
    shortDescription?: {
      processedHtml?: string;
    };
    image?: ImageData;
  };
}

export const buildQueryEventList = (): string => `
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
          shortDescription: ingress {
            processedHtml
          }
          image {
            ... on media_Image {
              displayName
              data {
                alternativeText: caption
              }
              url: imageUrl(type: absolute, scale: "block(459,295)")
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
`;

const map = (imageMap: ImageMapper) => ({
  id,
  name,
  url,
  data: {from, to, place, shortDescription, image} = {}
}: GuillotineEventItemRaw): EventData => ({
  id,
  title: name,
  url,
  date: from,
  to,
  location: {
    address: place
  },
  text: shortDescription?.processedHtml ?? '',
  image: image && imageMap(image)
});

export const extractEventList = extractList(map);

export default {
  buildQueryEventList,
  extractEventList
};
