import {Region, type ComponentProps, type PageData} from '@enonic/react-components';
import {Header} from '/react4xp/common/Header/Header';
import {Footer} from '/react4xp/common/Footer/Footer';
import type {CommonProcessorData} from '/react4xp/common/CommonProcessor/CommonProps';

export const Page = ({common, meta, component}: ComponentProps<PageData>) => {
    const { main: { components = [] } = {}} = component?.regions || {};
    const commonData = common as CommonProcessorData;

    console.log('[Page Component] Path:', component?.path);
    console.log('[Page Component] Components count:', components.length);

    // Workaround for React4xp v6 fragment bug (issue #1953)
    // Fragment at index 6 has corrupted path, so we slice it out
    const workingComponents = components.slice(0, 6);

    return (
        <div className="main-wrapper">
            <Header {...commonData} />

            <main>
                <Region common={common} meta={meta} data={workingComponents} name="main" />
            </main>

            <Footer
                menu={commonData?.menu}
                email={commonData?.email}
                phone={commonData?.phone}
                place={commonData?.place}
                some={commonData?.some}
            />
        </div>
    );
};
