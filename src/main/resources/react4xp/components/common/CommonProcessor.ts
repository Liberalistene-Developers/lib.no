import { PageDescriptor } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';

export const commonProcessor: ComponentProcessor<PageDescriptor> = (params) => {
    const title = params.content?.displayName || params.content._name || 'Display name not set';
    return {
        title: title,
        mode: params.request.mode || 'unknown',
    };
};
