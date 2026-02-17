import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import {type BaseLayoutProps} from '/react4xp/layouts/layoutUtils';
import {LayoutWrapper} from '/react4xp/layouts/LayoutWrapper';

export const SingleColumn = ({component, common, meta, data}: ComponentProps<LayoutData>) => (
	<LayoutWrapper {...(data as BaseLayoutProps)}>
		<Region
			data={component?.regions?.content?.components ?? []}
			meta={meta}
			common={common}
			name="content"
		/>
	</LayoutWrapper>
);
