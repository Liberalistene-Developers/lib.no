import { type PageComponent } from "@enonic-types/core";
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import type { ComponentDataAndProps, RegionsData } from '@enonic/react-components';

export const pageProcessor: ComponentProcessor<'lib.no:default'> = ({ component, request }) => {
  const { regions } = component as PageComponent;
  const mainComponents = regions.main?.components || [];

  // In edit mode, return empty data - the Page component will use component.regions directly
  if (request.mode === 'edit') {
    log.info('[PageProcessor] Edit mode - skipping processing');
    return {};
  }

  // Log what the PageProcessor receives from DataFetcher
  log.info(`[PageProcessor] Received ${mainComponents.length} components in main region`);
  mainComponents.forEach((comp, idx) => {
    if (comp && typeof comp === 'object' && 'component' in comp) {
      const c = (comp as ComponentDataAndProps).component as unknown as Record<string, unknown>;
      log.info(`[PageProcessor] INPUT[${idx}]: type=${c.type}, descriptor=${c.descriptor}, path=${c.path}`);
    }
  });

  // Fix fragments that have been unwrapped with corrupt paths
  // When a fragment is processed, the DataFetcher loads the fragment content and extracts the component,
  // but the component path becomes '/' instead of preserving the original fragment path
  const fixed = mainComponents.map((comp, index) => {
    if (!comp || typeof comp !== 'object' || !('component' in comp)) {
      return comp;
    }

    // Cast to the expected structure
    const typedComp = comp as ComponentDataAndProps;
    const componentMeta = typedComp.component;
    const compData = typedComp.data;

    // Type guard to ensure we have the expected structure
    if (!componentMeta || typeof componentMeta !== 'object') {
      return comp;
    }

    // Log ALL components for debugging
    const metaAsRecord = componentMeta as unknown as Record<string, unknown>;
    if ('type' in metaAsRecord && 'descriptor' in metaAsRecord && 'path' in metaAsRecord) {
      log.info(`[PageProcessor] Component at index ${index}: type=${metaAsRecord.type}, descriptor=${metaAsRecord.descriptor}, path=${metaAsRecord.path}`);
    }

    // Check if this is a fragment-unwrapped component with corrupt path
    // These components have path='/' and contain regions (they're layouts from fragments)
    if ('path' in componentMeta && 'regions' in componentMeta && componentMeta.path === '/' && componentMeta.regions) {
      const path = `/main/${index}`;

      log.info(`[PageProcessor] Repairing fragment-unwrapped component at index ${index}`);
      log.info(JSON.stringify(componentMeta, null, 2));

      try {
        // Recursively fix paths in nested components
        const fixComponentPaths = (components: unknown[], basePath: string, regionName: string): unknown[] => {
          return components.map((c, i) => {
            if (!c || typeof c !== 'object') return c;
            const item = c as Record<string, unknown>;
            if (!item.component || typeof item.component !== 'object') return c;

            const itemComponent = item.component as Record<string, unknown>;
            const fixedPath = `${basePath}/${regionName}/${i}`;

            // Log nested component info for debugging
            if ('type' in itemComponent && 'descriptor' in itemComponent) {
              log.info(`[PageProcessor] Fixing nested component at ${fixedPath}: type=${itemComponent.type}, descriptor=${itemComponent.descriptor}`);
            }

            return {
              ...item,
              component: {
                ...itemComponent,
                path: fixedPath
              },
            };
          });
        };

        const fixedRegions: Record<string, unknown> = {};
        const regions = componentMeta.regions as RegionsData;

        Object.keys(regions).forEach((regionKey) => {
          const region = regions[regionKey];
          if (region?.components) {
            fixedRegions[regionKey] = {
              ...region,
              components: fixComponentPaths(region.components, path, regionKey)
            };
          }
        });

        // Return the fixed structure
        // TypeScript can't infer the exact union type, so we return as-is
        const fixedComponent = {
          ...componentMeta,
          path,
          regions: fixedRegions,
        };

        // Log for debugging
        if ('type' in fixedComponent && 'descriptor' in fixedComponent) {
          log.info(`[PageProcessor] Fixed component type: ${fixedComponent.type}, descriptor: ${fixedComponent.descriptor}`);
        }

        return {
          component: fixedComponent,
          data: {
            ...compData,
            regions: fixedRegions,
          },
        } as ComponentDataAndProps;
      } catch (e) {
        log.error(`[PageProcessor] Error repairing fragment at index ${index}: ${e}`);
        log.error((e as Error).stack);
      }
    }

    return comp;
  });


  return {
    regions: {
      main: {
        name: 'main',
        components: fixed
      }
    }
  };
};
