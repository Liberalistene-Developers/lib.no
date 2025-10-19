import {render} from '/lib/enonic/react4xp';
import {getContent} from '/lib/xp/portal';
import {dataFetcher} from '/react4xp/dataFetcher';
import {handlePermissions, handleShortcut} from '/react4xp/utils/requestUtils';
import type {CommonProcessorData} from '/react4xp/common/CommonProcessor/CommonProps';
import type {Request, Response} from '@enonic-types/core';
import type {ImageData} from '/react4xp/common/types';

export function get(request: Request): Response {

    // Check content access and handle shortcuts
    const content = getContent();

    // log.info('[App - get] content', JSON.stringify(content, null, 2));

    if (!content) {
        return handlePermissions(request);
    } else if (content.type == "base:shortcut") {
        return handleShortcut(content);
    }

    // Fetch and process content data
    const data = dataFetcher.process({
        content,
        request,
    });

    if (data.component.type === "page" && !data.component.descriptor) {
        return {
            status: 418
        };
    }

    // Create HTML template
    const id = `react4xp_${content._id}`;
    const common = data.common as CommonProcessorData;
    const preloadImages = extractCriticalImages(data);
    const body = createHtmlTemplate(id, content.displayName, common?.cssUrl, preloadImages);

    // Render page
    const response = render(
        'App',
        data,
        request,
        {
            body,
            id,
        }
    );

    return response;
}

/**
 * Extracts critical images from the first component(s) in the page for preloading.
 *
 * Recursively searches the first component in the main region for ImageData objects
 * and returns their URLs for use in <link rel="preload"> tags.
 *
 * @param data - The data object returned from dataFetcher.process
 * @returns Array of image URLs to preload (maximum 3 for performance)
 */
function extractCriticalImages(data: unknown): string[] {
    const images: string[] = [];

    // Type guard to check if value is ImageData
    const isImageData = (value: unknown): value is ImageData => {
        return value !== null &&
               typeof value === 'object' &&
               'url' in value &&
               typeof (value as ImageData).url === 'string';
    };

    // Recursively extract image URLs from an object
    const extractImages = (obj: unknown, depth = 0): void => {
        // Limit recursion depth to avoid performance issues
        if (depth > 3 || images.length >= 3) return;

        if (!obj || typeof obj !== 'object') return;

        // Check if this object is an ImageData
        if (isImageData(obj) && obj.url) {
            images.push(obj.url);
            return;
        }

        // Recursively check object properties
        for (const key in obj) {
            if (images.length >= 3) break;
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                extractImages((obj as Record<string, unknown>)[key], depth + 1);
            }
        }
    };

    // Get the first component from the main region (most likely above the fold)
    const dataObj = data as {component?: {regions?: {main?: {components?: unknown[]}}}};
    const firstComponent = dataObj?.component?.regions?.main?.components?.[0];

    if (firstComponent) {
        extractImages(firstComponent);
    }

    return images;
}

function createHtmlTemplate(react4xpId: string, displayName: string, cssUrl?: string, preloadImages: string[] = []) {
    // Generate preload link tags for critical images
    const preloadLinks = preloadImages
        .map(url => `<link rel="preload" as="image" href="${url}">`)
        .join('\n            ');

    return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>${displayName}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="This page is a home movie database developed with React4XP 6.">
            ${cssUrl ? `<link rel="stylesheet" href="${cssUrl}">` : ''}
            ${preloadLinks}
		</head>
		<body>
			<div id="${react4xpId}" class="contentContainer"></div>
		</body>
	</html>`;
}
