import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getSections} from '/react4xp/utils/programme';

interface ProgrammeMainConfig {
  tableOfContent?: boolean;
}

interface ProgrammeMainData {
  tags?: string;
}

/**
 * Processes the main programme content for display.
 *
 * This processor fetches and organizes programme content sections using a specialized
 * programme utility function. It combines the programme title, hierarchical sections,
 * tags, and table of contents configuration.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @param {Content} params.content - The programme content item being displayed
 * @returns {object} Props for the ProgrammeMain component including:
 *   - title: Programme title from content display name
 *   - sections: Hierarchical structure of programme sections (fetched via getSections)
 *   - tags: Tags associated with the programme
 *   - tableOfContent: Boolean flag to show/hide table of contents
 *
 * @example
 * // Returns props with programme structure
 * {
 *   title: "Economic Policy 2024",
 *   sections: [
 *     {
 *       id: "section-1",
 *       title: "Tax Reform",
 *       content: "...",
 *       subsections: [...]
 *     }
 *   ],
 *   tags: "economy,taxes",
 *   tableOfContent: true
 * }
 */
export const programmeMainProcessor: ComponentProcessor<'lib.no:programme-main'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ProgrammeMainConfig;


  const data = content.data as ProgrammeMainData;

  const sections = getSections({key: content._path});

  return {
    title: content.displayName,
    sections,
    tags: data.tags,
    tableOfContent: config?.tableOfContent
  };
};
