import type { Request, Response } from '@enonic-types/core';
import { assetUrl, render } from '/lib/enonic/react4xp';
import { getContent } from '/lib/xp/portal';
import { dataFetcher } from '/react4xp/dataFetcher';
import { handlePermissions, handleShortcut } from '/react4xp/utils/requestUtils';

export function get(request: Request): Response {

    // Check content access and handle shortcuts
    const content = getContent();
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
    const body = createHtmlTemplate(id, content.displayName, content.language, 'cssUrl' in content ? `${content.cssUrl}` : 'styles/tailwind.css');

    // Render page
    return render(
        'App',
        data,
        request,
        {
            body,
            id,
        }
    );
}

function createHtmlTemplate(react4xpId: string, displayName: string, language: string, cssUrl: string) {
    return `<!DOCTYPE html>
	<html lang="${language ?? 'en'}">
		<head>
			<meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com/;">
      <title>${displayName ?? "Her kommer Liberalistene"}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
			<link href="${assetUrl({ path: cssUrl })}" rel="stylesheet"/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
      <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
		</head>
		<body>
			<div id="${react4xpId}" class="contentContainer"></div>
		</body>
	</html>`;
}
/*
<head>
		<meta charset="utf-8"/>




		<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
		<link data-th-href="${portal.assetUrl({'_path=styles/bundle.css'})}" href="../assets/styles/bundle.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
import {render} from '/lib/enonic/react4xp';
import {getContent} from '/lib/xp/portal';
import type {Request} from '@enonic-types/core';
import {dataFetcher} from '/react4xp/dataFetcher';
import {handlePermissions, jsonError, getComponent} from '/react4xp/utils/requestUtils';


export function get(request: Request) {
    const {
        branch,
        mode,
    } = request;

    // Check request mode and branch
    if (branch !== 'draft') {
        return jsonError('ComponentUrl only available at the draft branch.')
    }
    if (mode === 'live') {
        return jsonError('ComponentUrl not available in live mode.');
    }

    // Check content access
    const content = getContent();
    if (!content) {
        return handlePermissions(request);
    }

    // Fetch component data
    const component = getComponent({
        content,
        request,
    });

    // Fetch and process content data
    const data = dataFetcher.process({
        component,
        content,
        request
    });

    // Render page
    const id = `react4xp_${content._id}`;
    return render(
        'App',
        data,
        request,
        {
            body: `<div id="${id}"></div>`,
            id
        }
    );
}

*/
