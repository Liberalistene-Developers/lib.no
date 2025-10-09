import '@enonic/react-components/utils/initPublicPath'
import {AppProps} from '/types/AppProps';
import type {MetaData, ComponentProps} from '@enonic/react-components';
import * as React from 'react';
import {componentRegistry} from '../componentRegistry';

const ContentTypePage: React.FC<AppProps> = ({component, data, common, meta}) => {
    const compMeta: MetaData = meta as MetaData;
    compMeta.componentRegistry = componentRegistry;

    // For content-type based rendering (portal:site without page descriptor),
    // look up the View component directly from the registry
    const contentType = component?.contentType || (component as any)?.type;
    const entry = contentType ? componentRegistry.getContentType(contentType) : null;

    if (!entry || !entry.View) {
        return <div>No view found for content type: {contentType}</div>;
    }

    const View = entry.View;
    const componentProps: ComponentProps = {
        component,
        data,
        common,
        meta: compMeta
    };

    return <View {...componentProps} />;
}

ContentTypePage.displayName = 'ContentTypePage';

export default ContentTypePage;
