import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {pageUrl} from '/lib/xp/portal';
import {findChildren} from '/react4xp/utils/query';

interface LocalBranchesConfig {
  title?: string;
  centerheading?: boolean;
}

/**
 * Processes the LocalBranches list component to display all local chapters.
 *
 * This processor queries for all child content items of type 'lib.no:localbranch'
 * and transforms them into a list of local branch links with names and URLs.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @param {Content} params.content - The parent content item containing local branches as children
 * @returns {object} Props for the LocalBranches component including:
 *   - title: Optional heading text for the branches list
 *   - headingClassName: CSS class for heading alignment ('center' or undefined)
 *   - items: Array of local branch objects with name, path (URL), and id
 *
 * @example
 * // Returns props with list of local branches
 * {
 *   title: "Our Local Chapters",
 *   headingClassName: "center",
 *   items: [
 *     {name: "Oslo", path: "/localbranches/oslo", id: "abc123"},
 *     {name: "Bergen", path: "/localbranches/bergen", id: "def456"},
 *     {name: "Trondheim", path: "/localbranches/trondheim", id: "ghi789"}
 *   ]
 * }
 */
export const localBranchesProcessor: ComponentProcessor<'lib.no:localbranches'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as LocalBranchesConfig;


  const key = content._path;
  const items = key ? findChildren({key, count: 999}, 'lib.no:localbranch') : [];

  return {
    title: config?.title,
    headingClassName: config?.centerheading ? 'center' : undefined,
    items: items.map(({_id: id, _path: path, displayName: name}) => ({
      name,
      path: pageUrl({path}),
      id
    }))
  };
};
