import {Region, type ComponentProps, type LayoutData} from '@enonic/react-components';


export interface UnderConstructionPageData extends Record<string, unknown> {
  title?: string;
}

export const UnderConstructionPage = ({meta, component}: ComponentProps<LayoutData>) => {
  const {regions} = component;

  return (
    <main>
      {regions?.main && (
        <Region
          data={regions.main.components}
          meta={meta}
          name="main"
        />
      )}
    </main>
  );
};
