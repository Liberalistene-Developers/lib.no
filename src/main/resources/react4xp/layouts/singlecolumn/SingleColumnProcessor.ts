import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutDescriptor} from '@enonic-types/core';
import {extractBaseConfig} from '/react4xp/layouts/layoutUtils';

export const singleColumnProcessor: ComponentProcessor<LayoutDescriptor> = ({component}) => ({
	...extractBaseConfig(component),
});
