import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import type { FragmentComponent } from '@enonic-types/core';
import { get as getContent } from '/lib/xp/content';

/**
 * Fragment processor to handle portal:fragment content type
 *
 * This processor attempts to intercept fragments before DataFetcher unwraps them
 * and corrupts their paths from proper paths like /main/6 to /
 */
export const fragmentProcessor: ComponentProcessor = ({ component }) => {

  if (component) {
    const fragmentComp = component as FragmentComponent;

    // Load the fragment content to see what's inside
    if (fragmentComp.fragment) {
      try {
        const fragmentContent = getContent({ key: fragmentComp.fragment });
        if (fragmentContent) {
          // Fragment content loaded successfully
          // DataFetcher will handle the unwrapping
        }
      } catch (e) {
        log.error(`[FragmentProcessor] Error loading fragment content: ${e}`);
      }
    }
  }

  // Return empty data - let DataFetcher handle the unwrapping
  return {};
};
