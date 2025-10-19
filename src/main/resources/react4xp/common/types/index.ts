/**
 * Shared type definitions for common components
 *
 * This module exports reusable TypeScript interfaces used across multiple components
 * for consistent data structures throughout the application.
 */

/**
 * Basic image type with URL
 */
export interface ImageType {
  /** Image URL */
  url?: string;
}

/**
 * Extended image data with metadata
 *
 * Used throughout the application for images from Enonic XP content.
 * Includes display name and alternative text for accessibility.
 */
export interface ImageData extends ImageType {
  /** Display name from content */
  displayName?: string;
  /** Alternative text for accessibility (used in img alt attribute) */
  alternativeText?: string;
  /** Additional properties from content */
  [key: string]: unknown;
}

/**
 * Location/address data
 *
 * Used for events, organizations, and other location-based content.
 */
export interface LocationData {
  /** Street address or location description */
  address?: string;
  /** Location name or venue name */
  name?: string;
}

/**
 * Author/person data
 *
 * Used for article authors, event organizers, and other person references.
 */
export interface AuthorData {
  /** Unique author identifier */
  authorID?: string;
  /** Person name */
  person?: string;
  /** URL to person's profile or page */
  personUrl?: string;
  /** Author profile image */
  image?: ImageData;
}

/**
 * Generic item data for lists and grids
 *
 * Used by ArticleList, EventList, and other list components for consistent
 * item rendering across different content types.
 */
export interface ItemData {
  /** Unique item identifier */
  id?: string;
  /** Item image */
  image?: ImageData;
  /** Item name/title */
  name?: string;
  /** Short description or summary */
  shortDescription?: string;
  /** URL to item detail page */
  url?: string;
  /** Publication date (ISO string) */
  datePublished?: string;
  /** Item authors */
  authors?: AuthorData[];
}

/**
 * Grid item data for card-based layouts
 *
 * Simplified version of ItemData for grid displays that don't need
 * publication dates or author information.
 */
export interface GridItemData {
  /** Item image */
  image?: ImageData;
  /** Item name/title */
  name?: string;
  /** Short description or summary */
  shortDescription?: string;
  /** URL to item detail page */
  url?: string;
}
