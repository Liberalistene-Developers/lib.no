import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';

interface PersonListConfig {
  description?: string;
  displaytype?: string;
  imagesize?: string;
  imagetype?: boolean;
  persons?: string[];
  shortDescription?: string;
  title?: string;
}

interface PersonData {
  image?: string;
  'short-description'?: string;
}

/**
 * Processes a configured list of persons for display.
 *
 * This processor fetches multiple person content items by their IDs and transforms them
 * into a formatted list with images, URLs, and descriptions. Uses the Enonic Content API
 * to retrieve person data and the Portal API to generate page URLs.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @returns {object} Props for the PersonList component including:
 *   - title: List title from configuration
 *   - displaytype: Display style configuration
 *   - description: List description text
 *   - shortDescription: Brief description for the list
 *   - imagesize: Size configuration for person images
 *   - imagetype: Image type/style configuration
 *   - items: Array of person objects, each containing:
 *     - itemID: Content ID of the person
 *     - url: Page URL to the person's profile
 *     - name: Person's display name
 *     - shortDescription: Brief description of the person
 *     - image: Optimized image URL (256x256 square)
 *
 * @example
 * // Returns props with a list of persons
 * {
 *   title: "Our Team",
 *   displaytype: "grid",
 *   description: "Meet our leadership team",
 *   shortDescription: "Leadership",
 *   imagesize: "medium",
 *   imagetype: true,
 *   items: [
 *     {
 *       itemID: "abc123",
 *       url: "/people/john-doe",
 *       name: "John Doe",
 *       shortDescription: "CEO",
 *       image: "/_/image/abc123:def456/square(256)/photo.jpg"
 *     }
 *   ]
 * }
 */
export const personListProcessor: ComponentProcessor<'lib.no:personlist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as PersonListConfig;


  const items = config?.persons ? [].concat(config.persons) : [];

  return {
    title: config?.title,
    displaytype: config?.displaytype,
    description: config?.description,
    shortDescription: config?.shortDescription,
    imagesize: config?.imagesize,
    imagetype: config?.imagetype,
    items: items.map((itemID) => {
      const personContent = getContent({key: itemID});
      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        itemID,
        url: pageUrl({path: personContent._path}),
        name: personContent.displayName,
        shortDescription: personData['short-description'] || '',
        image: imageUrl(personData.image, 'square(256)')
      };
    }).filter(Boolean)
  };
};
