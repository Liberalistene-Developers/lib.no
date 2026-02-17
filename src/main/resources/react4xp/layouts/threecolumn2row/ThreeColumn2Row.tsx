import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import {type BaseLayoutProps} from '/react4xp/layouts/layoutUtils';
import {LayoutWrapper} from '/react4xp/layouts/LayoutWrapper';

interface ThreeColumn2RowData extends BaseLayoutProps {
	leftClassName?: string;
	middleClassName?: string;
	rightClassName?: string;
	orderClass?: string;
}

export const ThreeColumn2Row = ({component: {regions} = {} as LayoutData, meta, data = {}}: ComponentProps<LayoutData>) => {
	const {leftClassName = '', middleClassName = '', rightClassName = '', orderClass = '', ...baseProps} = data as ThreeColumn2RowData;

	const itemsClasses = ['items', orderClass].filter(Boolean).join(' ');

	return (
		<LayoutWrapper {...baseProps} contentItemClassName={itemsClasses}>
			<div className="content-child full">
				<Region
					data={regions?.top?.components}
					meta={meta}
					name="top"
				/>
			</div>
			<div className={['content-child', 'left', leftClassName].filter(Boolean).join(' ')}>
				<Region
					data={regions?.left?.components}
					meta={meta}
					name="left"
				/>
			</div>
			<div className={['content-child', 'middle', middleClassName].filter(Boolean).join(' ')}>
				<Region
					data={regions?.middle?.components}
					meta={meta}
					name="middle"
				/>
			</div>
			<div className={['content-child', 'right', rightClassName].filter(Boolean).join(' ')}>
				<Region
					data={regions?.right?.components}
					meta={meta}
					name="right"
				/>
			</div>
		</LayoutWrapper>
	);
};
