import {Region, type ComponentProps, type LayoutData} from '@enonic/react-components';
import {type BaseLayoutProps} from '/react4xp/layouts/layoutUtils';
import {LayoutWrapper} from '/react4xp/layouts/LayoutWrapper';

interface SingleColumn2RowData extends BaseLayoutProps {
	orderClass?: string;
}

export const SingleColumn2Row = ({meta, data = {}, component}: ComponentProps<LayoutData>) => {
	const {orderClass = '', ...baseProps} = data as SingleColumn2RowData;
	const {regions} = component;

	return (
		<LayoutWrapper {...baseProps} contentItemClassName={['items', orderClass].filter(Boolean).join(' ')}>
			<div className="content-child full">
				<Region
					data={regions?.top?.components}
					meta={meta}
					name="top"
				/>
			</div>
			<div className="content-child full">
				<Region
					data={regions?.bottom?.components}
					meta={meta}
					name="bottom"
				/>
			</div>
		</LayoutWrapper>
	);
};
