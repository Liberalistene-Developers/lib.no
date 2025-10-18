import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

interface MissionsBlockConfig {
  title?: string;
  centerheading?: boolean;
}

interface MissionsBlockData {
  missions?: Array<{image: string; title: string; description: string}>;
}

/**
 * Processes the MissionsBlock component to display the party's core political missions.
 *
 * This processor retrieves mission items from the content data and transforms them into
 * a display-ready format with optimized images. Each mission consists of an icon/image,
 * title, and description text.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @param {Content} params.content - The content item containing missions data
 * @returns {object} Props for the MissionsBlock component including:
 *   - title: Optional heading text for the missions section
 *   - headingClassName: CSS class for heading alignment ('center' or undefined)
 *   - items: Array of mission objects with description, full-size image URL, and title
 *
 * @example
 * // Returns props with list of political missions
 * {
 *   title: "Our Core Missions",
 *   headingClassName: "center",
 *   items: [
 *     {
 *       description: "Reduce government spending and lower taxes",
 *       image: "/_/image/abc123:def456/full/economy-icon.jpg",
 *       title: "Economic Freedom"
 *     },
 *     {
 *       description: "Protect individual rights and personal liberty",
 *       image: "/_/image/ghi789:jkl012/full/liberty-icon.jpg",
 *       title: "Individual Liberty"
 *     }
 *   ]
 * }
 */
export const missionsBlockProcessor: ComponentProcessor<'lib.no:missionsblock'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as MissionsBlockConfig;


  const data = content.data as MissionsBlockData;
  const missions = data.missions ? [].concat(data.missions) : [];

  return {
    title: config?.title,
    headingClassName: config?.centerheading ? 'center' : undefined,
    items: missions.map(({image: imageKey, title, description}) => {
      return {
        description,
        image: imageUrl(imageKey, 'full'),
        title
      };
    })
  };
};
