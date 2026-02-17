import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import {type BaseLayoutProps} from '/react4xp/layouts/layoutUtils';
import {LayoutWrapper} from '/react4xp/layouts/LayoutWrapper';

interface TwoColumn2RowData extends BaseLayoutProps {
	leftClassName?: string;
	rightClassName?: string;
	orderClass?: string;
}

export const TwoColumn2Row = ({component: {regions} = {} as LayoutData, meta, data = {}}: ComponentProps<LayoutData>) => {
	const {leftClassName = '', rightClassName = '', orderClass = '', ...baseProps} = data as TwoColumn2RowData;

	return (
		<LayoutWrapper {...baseProps} contentItemClassName={['items', orderClass].filter(Boolean).join(' ')}>
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
