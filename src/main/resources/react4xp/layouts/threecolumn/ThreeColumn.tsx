import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import {type BaseLayoutProps} from '/react4xp/layouts/layoutUtils';
import {LayoutWrapper} from '/react4xp/layouts/LayoutWrapper';

interface ThreeColumnData extends BaseLayoutProps {
	leftClassName?: string;
	middleClassName?: string;
	rightClassName?: string;
}

export const ThreeColumn = ({component: {regions} = {} as LayoutData, meta, data = {}}: ComponentProps<LayoutData>) => {
	const {leftClassName = '', middleClassName = '', rightClassName = '', ...baseProps} = data as ThreeColumnData;

	return (
		<LayoutWrapper {...baseProps} contentItemClassName="items">
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
