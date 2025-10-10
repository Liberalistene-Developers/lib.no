export interface ComponentData {
    component?: {
        path?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

interface SanitizeResult {
    components: ComponentData[];
    hadChanges: boolean;
}

/**
 * Sanitizes component paths to fix malformed paths like "/"
 * that should be "/main/X"
 */
export function sanitizeComponentPaths(
    components: ComponentData[],
    regionName: string = 'main'
): SanitizeResult {
    let hadChanges = false;
    let nextIndex = 0;

    // First pass: find the highest index in properly formatted paths
    components.forEach((element) => {
        if (element.component?.path) {
            const path = element.component.path;
            const match = path.match(/^\/main\/(\d+)/);
            if (match) {
                const index = parseInt(match[1], 10);
                if (index >= nextIndex) {
                    nextIndex = index + 1;
                }
            }
        }
    });

    // Second pass: fix malformed paths
    const sanitizedComponents = components.map((element): ComponentData => {
        if (!element.component?.path) {
            return element;
        }

        const path = element.component.path;

        // Check if path is malformed (like "/" or doesn't match /main/X pattern)
        const isProperPath = /^\/main\/\d+/.test(path);

        if (!isProperPath) {
            console.warn(`[PathSanitizer] Found malformed path: "${path}", fixing to "/${regionName}/${nextIndex}"`);
            hadChanges = true;

            const fixedPath = `/${regionName}/${nextIndex}`;
            nextIndex++;

            return {
                ...element,
                component: {
                    ...element.component,
                    path: fixedPath
                }
            };
        }

        return element;
    });

    return {
        components: sanitizedComponents,
        hadChanges
    };
}
