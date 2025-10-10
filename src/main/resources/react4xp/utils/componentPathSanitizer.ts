import type {ComponentDataAndProps, ComponentProps, PageData} from '@enonic/react-components';

/**
 * Recursively updates nested component paths when parent path changes
 */
function updateNestedPaths(component: ComponentDataAndProps, oldParentPath: string, newParentPath: string): ComponentDataAndProps {
    if (!component.component || !('regions' in component.component)) {
        return component;
    }

    const regions = component.component.regions as Record<string, {
        components?: ComponentDataAndProps[];
        name?: string;
    }>;

    if (!regions) {
        return component;
    }

    const updatedRegions: Record<string, {components?: ComponentDataAndProps[]; name?: string}> = {};

    for (const regionName in regions) {
        const region = regions[regionName];
        if (region.components) {
            updatedRegions[regionName] = {
                ...region,
                components: region.components.map((nestedComponent): ComponentDataAndProps => {
                    if (nestedComponent.component && 'path' in nestedComponent.component && typeof nestedComponent.component.path === 'string') {
                        const nestedPath = nestedComponent.component.path;
                        const prefix = oldParentPath + '/';
                        // Replace old parent path prefix with new one
                        if (nestedPath.indexOf(prefix) === 0) {
                            const updatedPath = nestedPath.replace(oldParentPath, newParentPath);
                            return {
                                ...nestedComponent,
                                component: {
                                    ...nestedComponent.component,
                                    path: updatedPath
                                }
                            } as ComponentDataAndProps;
                        }
                    }
                    return nestedComponent;
                })
            };
        } else {
            updatedRegions[regionName] = region;
        }
    }

    return {
        ...component,
        component: {
            ...component.component,
            regions: updatedRegions
        }
    } as ComponentDataAndProps;
}

/**
 * Sanitizes and persists malformed component paths
 *
 * Detects paths that don't match the expected /main/\d+ pattern,
 * fixes them by assigning sequential indices, and automatically
 * saves the changes back to Enonic XP.
 *
 * @param components - The original components array (not mutated)
 * @param meta - Component metadata containing contentId for persistence
 * @returns A new array with sanitized component paths
 */
export function sanitizeAndPersistComponentPaths(
    components: ComponentDataAndProps[],
    meta: ComponentProps<PageData>['meta']
): ComponentDataAndProps[] {
    let hadChanges = false;

    // First, sort components by their path index
    const sortedComponents = [...components].sort((a, b) => {
        // Extract path numbers using regex
        const aPath = a.component && 'path' in a.component && typeof a.component.path === 'string'
            ? a.component.path
            : '';
        const bPath = b.component && 'path' in b.component && typeof b.component.path === 'string'
            ? b.component.path
            : '';

        const aMatch = aPath.match(/\/main\/(\d+)/);
        const bMatch = bPath.match(/\/main\/(\d+)/);

        const aIndex = aMatch ? parseInt(aMatch[1], 10) : 999999;
        const bIndex = bMatch ? parseInt(bMatch[1], 10) : 999999;

        return aIndex - bIndex;
    });

    // Then renumber all components with consecutive indices (0, 1, 2, 3...)
    const sanitizedComponents = sortedComponents.map((element, index): ComponentDataAndProps => {
        // Destructure with default empty object for data (React4xp Region requires it)
        const { component, ...rest } = element;
        let { data = {} } = element;

        // If component has regions but data.regions is missing, mirror it from component
        if (component && 'regions' in component && component.regions && !data.regions) {
            data = {
                ...data,
                regions: component.regions
            };
        }

        if (component && 'path' in component && typeof component.path === 'string') {
            const oldPath = component.path;
            const expectedPath = `/main/${index}`;

            // Check if path needs to be fixed (either malformed or wrong index)
            if (oldPath !== expectedPath) {
                console.warn(`[PathSanitizer] Fixing path: "${oldPath}" → "${expectedPath}"`);
                hadChanges = true;

                // Update the component path
                const updatedComponent = {
                    ...rest,
                    component: {
                        ...component,
                        path: expectedPath
                    },
                    data
                } as ComponentDataAndProps;

                // Also update all nested component paths in regions
                return updateNestedPaths(updatedComponent, oldPath, expectedPath);
            }
        }

        return { component, data, ...rest } as ComponentDataAndProps;
    });

    if (hadChanges) {
        console.warn('[PathSanitizer] Renumbered component paths to be consecutive.');
    }

    return sanitizedComponents;
}
