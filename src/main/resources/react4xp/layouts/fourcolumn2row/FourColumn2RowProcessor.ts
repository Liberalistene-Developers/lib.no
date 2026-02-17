import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';
import {extractBaseConfig} from '/react4xp/layouts/layoutUtils';

export const fourColumn2RowProcessor: ComponentProcessor<'lib.no:fourcolumn2row'> = ({component}) => {
	const layoutComponent = component as unknown as LayoutComponent;
	const config = layoutComponent.config as {columnsLayout?: string; reverseroworder?: boolean};

	const columnsLayout = config?.columnsLayout || '';
	const [leftClassName, middleLeftClassName, middleRightClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', '', '', ''];

	return {
		...extractBaseConfig(component),
		leftClassName,
		middleLeftClassName,
		middleRightClassName,
		rightClassName,
		orderClass: config?.reverseroworder ? 'reverse' : '',
	};
};
