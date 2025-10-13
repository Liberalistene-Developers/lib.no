import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import type { FragmentComponent } from '@enonic-types/core';
import { get as getContent } from '/lib/xp/content';

/**
 * Fragment processor to handle portal:fragment content type
 *
 * This processor attempts to intercept fragments before DataFetcher unwraps them
 * and corrupts their paths from proper paths like /main/6 to /
 */
export const fragmentProcessor: ComponentProcessor = ({ component, content, request }) => {
  log.info('[FragmentProcessor] ===== FRAGMENT PROCESSOR CALLED =====');
  log.info(`[FragmentProcessor] Content: ${content._id}, path: ${content._path}`);

  if (component) {
    const fragmentComp = component as FragmentComponent;
    log.info(`[FragmentProcessor] Component type: ${fragmentComp.type}`);
    log.info(`[FragmentProcessor] Component path: ${fragmentComp.path}`);
    log.info(`[FragmentProcessor] Fragment ID: ${fragmentComp.fragment}`);

    // Load the fragment content to see what's inside
    if (fragmentComp.fragment) {
      try {
        const fragmentContent = getContent({ key: fragmentComp.fragment });
        if (fragmentContent) {
          log.info(`[FragmentProcessor] Fragment content type: ${fragmentContent.type}`);
          // Access the fragment component (layout or part) from the content
          if (fragmentContent.page) {
            log.info(`[FragmentProcessor] Fragment has page component`);
            log.info(JSON.stringify(fragmentContent.page, null, 2));
          }
        }
      } catch (e) {
        log.error(`[FragmentProcessor] Error loading fragment content: ${e}`);
      }
    }
  }

  log.info(`[FragmentProcessor] Request mode: ${request.mode}`);
  log.info('[FragmentProcessor] ===== END FRAGMENT PROCESSOR =====');

  // Return empty data - let DataFetcher handle the unwrapping
  // We're just observing what happens at this stage
  return {};
};
