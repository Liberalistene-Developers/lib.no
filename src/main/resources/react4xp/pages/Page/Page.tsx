import {ComponentDataAndProps, Region, type ComponentProps, type PageData, type RegionsData} from '@enonic/react-components';
// import {sanitizeAndPersistComponentPaths} from '/react4xp/utils/componentPathSanitizer';

export const Page = ({common, meta, data, component}: ComponentProps<PageData>) => {
    const regions = data.regions as RegionsData;
    const mainComponents = regions?.main?.components;

    // In edit mode, use component.regions for Live Edit compatibility
    // Otherwise use the processed data.regions
    const componentsToRender = meta.mode === 'edit' && component?.regions?.main?.components
        ? component.regions.main.components
        : mainComponents;

    return (
        <div>
            <Region common={common} meta={meta} data={componentsToRender} name="main" />
        </div>
    );
};
