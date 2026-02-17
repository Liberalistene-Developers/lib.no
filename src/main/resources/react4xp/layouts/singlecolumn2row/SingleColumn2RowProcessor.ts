import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';
import {extractBaseConfig} from '/react4xp/layouts/layoutUtils';

export const singleColumn2RowProcessor: ComponentProcessor<'lib.no:singlecolumn2row'> = ({component}) => {
	const layoutComponent = component as unknown as LayoutComponent;
	const config = layoutComponent.config as {reverseroworder?: boolean};

	return {
		...extractBaseConfig(component),
		orderClass: config?.reverseroworder ? 'reverse' : '',
	};
};
