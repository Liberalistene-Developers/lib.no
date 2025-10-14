import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';

export const pageProcessor: ComponentProcessor<'lib.no:default'> = (props) => {
  // Fragment workaround is handled in Page.tsx component

  log.info('[pageProcessor]', JSON.stringify(props, null, 2));

  return {};
};
