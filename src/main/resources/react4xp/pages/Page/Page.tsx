import {Region, type ComponentProps, type PageData} from '@enonic/react-components';
import {Header} from '/react4xp/common/Header/Header';
import {Footer} from '/react4xp/common/Footer/Footer';
import {ErrorBoundary} from '/react4xp/common/ErrorBoundary/ErrorBoundary';
import type {CommonProcessorData} from '/react4xp/common/CommonProcessor/CommonProps';
import {logger} from '/react4xp/utils/logger';

export const Page = ({common, meta, component}: ComponentProps<PageData>) => {
    const { main: { components = [] } = {}} = component?.regions || {};
    const commonData = common as CommonProcessorData;

    logger.debug('[Page Component] Path:', {path: component?.path});
    logger.debug('[Page Component] Components count:', {count: components.length});

    return (
        <ErrorBoundary>
            <div className="main-wrapper">
                <Header {...commonData} />

                <ErrorBoundary>
                    <main>
                        <Region common={common} meta={meta} data={components} name="main" />
                    </main>
                </ErrorBoundary>

                <Footer
                    menu={commonData?.menu}
                    email={commonData?.email}
                    phone={commonData?.phone}
                    place={commonData?.place}
                    some={commonData?.some}
                />
            </div>
        </ErrorBoundary>
    );
};
