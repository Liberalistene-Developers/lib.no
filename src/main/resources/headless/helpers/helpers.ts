export const buildParentPathQuery = (parentPath: string): string =>
  `_parentPath = '/content${parentPath}'`;

// If arg is falsy, returns an empty array.
export const forceArray = <T>(maybeArray?: T | T[]): T[] =>
  maybeArray ? [].concat(maybeArray as never) : [];

interface ImageData {
  url?: string;
  data?: {
    alternativeText?: string;
  };
}

interface GuillotineQueryItem {
  id?: string;
  name?: string;
  url?: string;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

interface GuillotineResponse {
  data?: {
    guillotine?: {
      query?: GuillotineQueryItem[];
    };
  };
}

interface MappedImage {
  url?: string;
  alternativeText?: string;
}

type ImageMapper = (image: ImageData) => MappedImage;
type ItemMapper<T> = (imageMap: ImageMapper) => (item: GuillotineQueryItem) => T;

export const extractList = <T>(map: ItemMapper<T>) => (responseData: GuillotineResponse): T[] => {
  const {
    data: {
      guillotine: {
        query = []
      } = {}
    } = {}
  } = responseData || {};

  const imageMap: ImageMapper = ({url, data: {alternativeText} = {}} = {}) => ({
    url,
    alternativeText
  });

  return query
    .filter(item => item && typeof item === 'object' && item.data)
    .map(map(imageMap));
};
