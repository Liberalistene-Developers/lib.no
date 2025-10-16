import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {processHtml} from '/react4xp/utils/html';

interface TextBlockConfig {
  title?: string;
  titleColor?: string;
  text?: string;
}

export const textBlockProcessor: ComponentProcessor<'lib.no:textblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as TextBlockConfig;


  return {
    title: config?.title || '',
    titleColor: config?.titleColor || '',
    text: processHtml(config?.text || '')
  };
};
