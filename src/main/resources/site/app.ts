import {render} from '/lib/enonic/react4xp';
import {getContent} from '/lib/xp/portal';
import {dataFetcher} from '/react4xp/dataFetcher';
import {handlePermissions, handleShortcut} from '/react4xp/utils/requestUtils';
import type {Request, Response} from '@enonic-types/core';

export function get(request: Request): Response {
    log.info('[app.ts] GET request received');

    try {
        // Check content access and handle shortcuts
        const content = getContent();
        if (!content) {
            log.info('[app.ts] No content found, handling permissions');
            return handlePermissions(request);
        } else if (content.type == "base:shortcut") {
            log.info('[app.ts] Handling shortcut content');
            return handleShortcut(content);
        }

        log.info('[app.ts] Processing content: ' + content._id + ' (' + content.type + ')');
        log.info('[app.ts] Content page descriptor: ' + ((content.page && content.page.descriptor) || 'none'));

        // Fetch and process content data
        // PageContentProcessor will delegate to page descriptor processor if needed
        const data = dataFetcher.process({
            content,
            request,
        });

        log.info('[app.ts] Data processed successfully');
        log.info('[app.ts] Component type: ' + data.component.type);
        log.info('[app.ts] Component descriptor: ' + (data.component.descriptor || 'none'));

        // Use App entry for page descriptors, ContentTypePage for pure content-type rendering
        const hasPageDescriptor = data.component.type === 'page' && data.component.descriptor;
        const entryComponent = hasPageDescriptor ? 'App' : 'ContentTypePage';

        // Create HTML template
        const id = `react4xp_${content._id}`;
        const body = createHtmlTemplate(id, content.displayName);

        log.info('[app.ts] Rendering with entry: ' + entryComponent);
        log.info('[app.ts] Has page descriptor: ' + hasPageDescriptor);
        log.info('[app.ts] Descriptor value: ' + (data.component.descriptor || 'none'));
        log.info('[app.ts] Component type: ' + data.component.type);
        log.info('[app.ts] Component ID: ' + id);
        log.info('[app.ts] Has regions in data: ' + !!(data.data && data.data.regions));

        // Render page
        const react4xpResponse = render(
            entryComponent,
            data,
            request,
            {
                body,
                id,
            }
        );

        log.info('[app.ts] Render completed');
        log.info('[app.ts] Response body length: ' + (react4xpResponse.body ? react4xpResponse.body.length : 0));
        log.info('[app.ts] Response body preview: ' + (react4xpResponse.body ? react4xpResponse.body.substring(0, 500) : 'empty'));

        // Transform React4xp response to Enonic XP HTTP response
        return {
            status: 200,
            contentType: 'text/html; charset=UTF-8',
            body: react4xpResponse.body,
            pageContributions: react4xpResponse.pageContributions
        };
    } catch (error) {
        log.error('[app.ts] Error during rendering: ' + error);
        log.error('[app.ts] Error stack: ' + (error as Error).stack);
        return {
            status: 500,
            body: '<html><body><h1>Error</h1><pre>' + error + '\n\n' + (error as Error).stack + '</pre></body></html>',
            contentType: 'text/html'
        };
    }
}

function createHtmlTemplate(react4xpId: string, displayName: string) {
    return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>${displayName}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="This page is a home movie database developed with React4XP 6.">
		</head>
		<body>
			<div id="${react4xpId}" class="contentContainer"></div>
		</body>
	</html>`;
}
