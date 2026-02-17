import type {LayoutComponent} from '@enonic-types/core';

export interface BaseLayoutConfig {
	articlewidth?: boolean;
	background?: string;
	borderbottom?: boolean;
	fullwidth?: boolean;
	paddingbottom?: boolean;
	paddingtop?: boolean;
}

export interface BaseLayoutProps {
	articleWidth?: boolean;
	background?: string;
	borderBottom?: boolean;
	fullWidth?: boolean;
	paddingBottom?: boolean;
	paddingTop?: boolean;
}

export const extractBaseConfig = (component: unknown): BaseLayoutProps => {
	const layoutComponent = component as LayoutComponent;
	const config = layoutComponent.config as BaseLayoutConfig;
	return {
		articleWidth: config?.articlewidth,
		background: config?.background,
		borderBottom: config?.borderbottom,
		fullWidth: config?.fullwidth,
		paddingBottom: config?.paddingbottom,
		paddingTop: config?.paddingtop,
	};
};
