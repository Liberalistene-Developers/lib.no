import { type ImageData, type ImageMapper } from '../image';

export const buildParentPathQuery = (parentPath: string): string =>
  `_parentPath = '/content${parentPath}'`;

// If arg is falsy, returns an empty array.
export const forceArray = <T>(maybeArray?: T | T[]): T[] =>
  maybeArray ? [].concat(maybeArray as never) : [];

// Internal types for extractList helper
interface RawImageData {
  url?: string;
  data?: {
    alternativeText?: string;
  };
  [key: string]: unknown;
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

type ItemMapper<T> = (imageMap: ImageMapper) => (item: GuillotineQueryItem) => T;

export const extractList = <T>(map: ItemMapper<T>) => (responseData: GuillotineResponse): T[] => {
  const {
    data: {
      guillotine: {
        query = []
      } = {}
    } = {}
  } = responseData || {};

  const imageMap: ImageMapper = (rawImage: ImageData = {}): ImageData => {
    const typedImage = rawImage as RawImageData;
    return {
      url: typedImage.url,
      alternativeText: typedImage.data?.alternativeText
    };
  };

  return query
    .filter(item => item && typeof item === 'object' && item.data)
    .map(map(imageMap));
};
