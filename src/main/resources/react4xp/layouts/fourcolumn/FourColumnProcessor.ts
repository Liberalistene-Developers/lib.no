import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';
import {extractBaseConfig} from '/react4xp/layouts/layoutUtils';

export const fourColumnProcessor: ComponentProcessor<'lib.no:fourcolumn'> = ({component}) => {
	const layoutComponent = component as unknown as LayoutComponent;
	const config = layoutComponent.config as {columnsLayout?: string};

	const columnsLayout = config?.columnsLayout || '';
	const [leftClassName, middleLeftClassName, middleRightClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', '', '', ''];

	return {
		...extractBaseConfig(component),
		leftClassName,
		middleLeftClassName,
		middleRightClassName,
		rightClassName,
	};
};
