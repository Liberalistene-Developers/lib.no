import '@enonic/react-components/utils/initPublicPath'
import {AppProps} from '/types/AppProps';
import type {MetaData} from '@enonic/react-components';
import {BaseComponent} from '@enonic/react-components';
import {type FC} from 'react';
import {componentRegistry} from '/react4xp/componentRegistry';

const App: FC<AppProps> = ({component, data, common, meta}) => {
    const compMeta: MetaData = meta as MetaData;
    compMeta.componentRegistry = componentRegistry;

    return (
        <>
            <BaseComponent component={component} data={data} common={common} meta={compMeta}/>
        </>
    );
}

App.displayName = 'App';

export default App;

