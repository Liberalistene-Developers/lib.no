import {render} from '/lib/enonic/react4xp';
import {getContent} from '/lib/xp/portal';
import {dataFetcher} from '/react4xp/dataFetcher';
import {handlePermissions, handleShortcut} from '/react4xp/utils/requestUtils';
import type {CommonProcessorData} from '/react4xp/common/CommonProcessor/CommonProps';
import type {Request, Response} from '@enonic-types/core';

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
    const body = createHtmlTemplate(id, content.displayName, common?.cssUrl);

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

    // Add CSP headers to allow iframes from Google and other common embed sources
    if (!response.headers) {
        response.headers = {};
    }

    response.headers['Content-Security-Policy'] =
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://docs.google.com https://www.youtube.com https://youtube.com https://player.vimeo.com;";

    return response;
}

function createHtmlTemplate(react4xpId: string, displayName: string, cssUrl?: string) {
    return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>${displayName}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="This page is a home movie database developed with React4XP 6.">
            ${cssUrl ? `<link rel="stylesheet" href="${cssUrl}">` : ''}
		</head>
		<body>
			<div id="${react4xpId}" class="contentContainer"></div>
		</body>
	</html>`;
}
