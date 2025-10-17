import {Region, type ComponentProps, type PageData} from '@enonic/react-components';
import {ErrorBoundary} from '/react4xp/common/ErrorBoundary/ErrorBoundary';
import {logger} from '/react4xp/utils/logger';

export const SitePage = ({component, meta}: ComponentProps<PageData>) => {
  logger.debug('[SitePage] Rendering simple region structure');

  // Simple structure like the React4xp documentation example
  return (
    <ErrorBoundary>
      <Region data={component.regions?.main?.components ?? []} meta={meta} name="main"/>
    </ErrorBoundary>
  );
};
