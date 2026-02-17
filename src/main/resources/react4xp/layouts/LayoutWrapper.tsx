import {type ReactNode} from 'react';
import {type BaseLayoutProps} from '/react4xp/layouts/layoutUtils';

interface LayoutWrapperProps extends BaseLayoutProps {
	contentItemClassName?: string;
	children: ReactNode;
}

export const LayoutWrapper = ({
	articleWidth = false,
	background = '',
	borderBottom = false,
	fullWidth = false,
	paddingBottom = false,
	paddingTop = false,
	contentItemClassName = '',
	children,
}: LayoutWrapperProps) => {
	const contentHolderClasses = [
		'content-holder',
		background,
		paddingBottom ? 'padding-bottom' : '',
		paddingTop ? 'padding-top' : '',
	].filter(Boolean).join(' ');

	const contentClasses = [
		'content',
		fullWidth ? 'full' : '',
	].filter(Boolean).join(' ');

	const contentItemClasses = [
		'content-item',
		articleWidth ? 'article-width' : '',
		contentItemClassName,
	].filter(Boolean).join(' ');

	const dividerClasses = [
		'divider',
		borderBottom ? 'visible' : '',
	].filter(Boolean).join(' ');

	return (
		<div className={contentHolderClasses}>
			<div className={contentClasses}>
				<div className={contentItemClasses}>
					{children}
				</div>
				<div className={dividerClasses}></div>
			</div>
		</div>
	);
};
