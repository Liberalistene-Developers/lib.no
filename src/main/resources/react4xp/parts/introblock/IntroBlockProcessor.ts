import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';

interface IntroBlockData {
  introimage?: string;
  introtitle?: string;
  introdescription?: string;
  introcaption?: string;
}

export const introBlockProcessor: ComponentProcessor<'lib.no:introblock'> = () => {
  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as IntroBlockData;

  return {
    caption: data.introcaption,
    description: data.introdescription,
    image: imageUrl(data.introimage, 'full'),
    title: data.introtitle
  };
};
