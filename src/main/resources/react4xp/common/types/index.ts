/**
 * Shared type definitions for common components
 */

export interface ImageType {
  url?: string;
}

export interface ImageData extends ImageType {
  displayName?: string;
  alternativeText?: string;
  [key: string]: unknown;
}

export interface LocationData {
  address?: string;
  name?: string;
}

export interface AuthorData {
  authorID?: string;
  person?: string;
  personUrl?: string;
  image?: ImageData;
}

export interface ItemData {
  id?: string;
  image?: ImageData;
  name?: string;
  shortDescription?: string;
  url?: string;
  datePublished?: string;
  authors?: AuthorData[];
}

export interface GridItemData {
  image?: ImageData;
  name?: string;
  shortDescription?: string;
  url?: string;
}
