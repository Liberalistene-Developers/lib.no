import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';
import {extractBaseConfig} from '/react4xp/layouts/layoutUtils';

export const threeColumn2RowProcessor: ComponentProcessor<'lib.no:threecolumn2row'> = ({component}) => {
	const layoutComponent = component as unknown as LayoutComponent;
	const config = layoutComponent.config as {columnsLayout?: string; reverseroworder?: boolean};

	const columnsLayout = config?.columnsLayout || '';
	const [leftClassName, middleClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', '', ''];

	return {
		...extractBaseConfig(component),
		leftClassName,
		middleClassName,
		rightClassName,
		orderClass: config?.reverseroworder ? 'reverse' : '',
	};
};
