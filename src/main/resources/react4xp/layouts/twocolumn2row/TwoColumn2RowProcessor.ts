import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';
import {extractBaseConfig} from '/react4xp/layouts/layoutUtils';

export const twoColumn2RowProcessor: ComponentProcessor<'lib.no:twocolumn2row'> = ({component}) => {
	const layoutComponent = component as unknown as LayoutComponent;
	const config = layoutComponent.config as {columnsLayout?: string; reverseroworder?: boolean};

	const columnsLayout = config?.columnsLayout || '';
	const [leftClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', ''];

	return {
		...extractBaseConfig(component),
		leftClassName,
		rightClassName,
		orderClass: config?.reverseroworder ? 'reverse' : '',
	};
};
