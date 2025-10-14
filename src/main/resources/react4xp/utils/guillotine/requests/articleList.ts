import { extractList } from '../helpers';
import { type ImageData, type ImageMapper } from '../../image';

interface ArticleData {
  id?: string;
  name?: string;
  url?: string;
  datePublished?: string;
  shortDescription?: string;
  image?: ImageData;
  [key: string]: unknown;
}

interface GuillotineArticleItemRaw {
  id?: string;
  name?: string;
  url?: string;
  data?: {
    datePublished?: string;
    shortDescription?: {
      processedHtml?: string;
    };
    image?: ImageData;
  };
}

export const buildQueryArticleList = (): string => `
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
  data: {datePublished, shortDescription, image} = {}
}: GuillotineArticleItemRaw): ArticleData => ({
  id,
  name,
  url,
  datePublished,
  shortDescription: shortDescription?.processedHtml ?? '',
  image: image && imageMap(image)
});

export const extractArticleList = extractList(map);

export default {
  buildQueryArticleList,
  extractArticleList
};
