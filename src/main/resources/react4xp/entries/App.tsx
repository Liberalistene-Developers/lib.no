import '@enonic/react-components/utils/initPublicPath'
import {AppProps} from '/types/AppProps';
import type {MetaData} from '@enonic/react-components';
import {BaseComponent} from '@enonic/react-components';
import * as React from 'react';
import {componentRegistry} from '../componentRegistry';

const App: React.FC<AppProps> = ({component, data, common, meta}) => {
    const compMeta: MetaData = meta as MetaData;
    compMeta.componentRegistry = componentRegistry;

    // console.info('[App] Rendering BaseComponent with registry and data', JSON.stringify(component, null, 2));

    return (
        <>
            <BaseComponent component={component} data={data} common={common} meta={compMeta}/>
        </>
    );
}

App.displayName = 'App';

export default App;

