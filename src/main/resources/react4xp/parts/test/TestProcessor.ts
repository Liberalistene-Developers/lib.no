import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';

export const testProcessor: ComponentProcessor<'lib.no:test'> = () => {
  return {
    message: 'Hello from React4xp v6!'
  };
};
