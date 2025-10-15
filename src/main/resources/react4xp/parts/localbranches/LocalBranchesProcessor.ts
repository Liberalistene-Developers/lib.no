import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent, pageUrl} from '/lib/xp/portal';
import {findChildren} from '/react4xp/utils/query';

interface LocalBranchesConfig {
  title?: string;
  centerheading?: boolean;
}

export const localBranchesProcessor: ComponentProcessor<'lib.no:localbranches'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as LocalBranchesConfig;

  log.info(`[LocalBranchesProcessor] Processing path: ${partComponent.path}`);

  const content = getPortalContent();
  if (!content) {
    return {};
  }

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
