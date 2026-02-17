import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';
import {extractBaseConfig} from '/react4xp/layouts/layoutUtils';

export const threeColumnProcessor: ComponentProcessor<'lib.no:threecolumn'> = ({component}) => {
	const layoutComponent = component as unknown as LayoutComponent;
	const config = layoutComponent.config as {columnsLayout?: string};

	const columnsLayout = config?.columnsLayout || '';
	const [leftClassName, middleClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', '', ''];

	return {
		...extractBaseConfig(component),
		leftClassName,
		middleClassName,
		rightClassName,
	};
};
