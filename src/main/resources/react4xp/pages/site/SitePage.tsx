import {Region, type ComponentProps, type PageData} from '@enonic/react-components';

export const SitePage = ({component, meta}: ComponentProps<PageData>) => {
  console.info('[SitePage] Rendering simple region structure');

  // Simple structure like the React4xp documentation example
  return (
    <Region data={component.regions?.main?.components ?? []} meta={meta} name="main"/>
  );
};
