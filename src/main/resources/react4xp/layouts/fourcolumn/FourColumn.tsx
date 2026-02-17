import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import {type BaseLayoutProps} from '/react4xp/layouts/layoutUtils';
import {LayoutWrapper} from '/react4xp/layouts/LayoutWrapper';

interface FourColumnData extends BaseLayoutProps {
	leftClassName?: string;
	middleLeftClassName?: string;
	middleRightClassName?: string;
	rightClassName?: string;
}

export const FourColumn = ({component: {regions} = {} as LayoutData, meta, data = {}}: ComponentProps<LayoutData>) => {
	const {leftClassName = '', middleLeftClassName = '', middleRightClassName = '', rightClassName = '', ...baseProps} = data as FourColumnData;

	return (
		<LayoutWrapper {...baseProps} contentItemClassName="items">
			<div className={['content-child', 'left', leftClassName].filter(Boolean).join(' ')}>
				<Region
					data={regions?.left?.components}
					meta={meta}
					name="left"
				/>
			</div>
			<div className={['content-child', 'middleleft', middleLeftClassName].filter(Boolean).join(' ')}>
				<Region
					data={regions?.middleleft?.components}
					meta={meta}
					name="middleleft"
				/>
			</div>
			<div className={['content-child', 'middleright', middleRightClassName].filter(Boolean).join(' ')}>
				<Region
					data={regions?.middleright?.components}
					meta={meta}
					name="middleright"
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
