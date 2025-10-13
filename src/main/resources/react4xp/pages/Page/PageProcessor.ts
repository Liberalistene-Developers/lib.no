import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';

export const pageProcessor: ComponentProcessor<'lib.no:default'> = () => {
  // Fragment workaround is handled in Page.tsx component
  return {};
};
