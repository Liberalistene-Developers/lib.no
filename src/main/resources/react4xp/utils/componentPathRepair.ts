import type { Content, LayoutComponent, PartComponent, FragmentComponent, TextComponent } from "@enonic-types/core";
import { modify } from '/lib/xp/content';

type Component = LayoutComponent | PartComponent | FragmentComponent | TextComponent;

function hasCorruptPaths(components: Component[], regionName: string): boolean {
  for (let i = 0; i < components.length; i++) {
    const comp = components[i];
    const expectedPath = `/${regionName}/${i}`;
    if (comp.path !== expectedPath) {
      return true;
    }
  }
  return false;
}

export function repairComponentPaths(content: Content, components: Component[], regionName: string): Component[] {
  // Fix corrupt paths in the database
  if (hasCorruptPaths(components, regionName)) {
    log.warning(`Detected corrupt component paths in content ${content._id} region ${regionName}, repairing...`);
    log.info(`Repairing corrupt component paths in content: ${content._path}`);

    try {
      const modifiedContent = modify({
        key: content._id,
        requireValid: false,
        editor: (c) => {
          // Remove invalid properties from site config that might cause marshal errors
          if (c.data && typeof c.data === 'object' && 'trackingId' in c.data) {
            delete c.data.trackingId;
          }

          // Find regions in page
          if (c.page && c.page.regions && c.page.regions[regionName] && c.page.regions[regionName].components) {
            const components = c.page.regions[regionName].components;

            // Create regex pattern for the specific region (e.g., '/main/(\d+)')
            const pathPattern = new RegExp(`\\/${regionName}\\/(\\d+)`);

            // Sort by existing path index first
            const sorted = components.sort((a: Component, b: Component) => {
              const aPath = a.path || '';
              const bPath = b.path || '';

              const aMatch = aPath.match(pathPattern);
              const bMatch = bPath.match(pathPattern);
              const aIndex = aMatch ? parseInt(aMatch[1], 10) : 999999;
              const bIndex = bMatch ? parseInt(bMatch[1], 10) : 999999;
              return aIndex - bIndex;
            });

            // Renumber consecutively
            c.page.regions[regionName].components = sorted.map((comp: Component, index: number) => {
              const expectedPath = `/${regionName}/${index}`;

              if (comp.path !== expectedPath) {
                log.info(`Fixed: "${comp.path || ''}" -> "${expectedPath}"`);
                comp.path = expectedPath;
              }
              return comp;
            });
          }
          return c;
        }
      });

      log.info(`Successfully repaired component paths in content: ${content._path}`);

      // Return the repaired components
      return modifiedContent.page?.regions?.[regionName]?.components || components;
    } catch (error) {
      log.error(`Failed to repair component paths in content ${content._path}:`, error);
      return components;
    }
  }

  return components;
}
