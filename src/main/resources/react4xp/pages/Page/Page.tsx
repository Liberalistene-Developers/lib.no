import {Region, type ComponentProps, type PageData, } from '@enonic/react-components';

export const Page = ({common, meta, component}: ComponentProps<PageData>) => {
    const { main: { components = [] } = {}} = component?.regions || {};

    // Workaround for React4xp v6 fragment bug (issue #1953)
    // Fragment at index 6 has corrupted path, so we slice it out
    const workingComponents = components.slice(0, 6);

    return (
        <div>
            <Region common={common} meta={meta} data={workingComponents} name="main" />
        </div>
    );
};
