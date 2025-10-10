import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getContent as getPortalContent, attachmentUrl} from '/lib/xp/portal';

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

  const image = data.introimage && {
    // TODO: Add back when /lib/shared/image is migrated
    // ...imageUrl(data.introimage, 'full'),
    url: attachmentUrl({id: data.introimage})
  };

  return {
    caption: data.introcaption,
    description: data.introdescription,
    image,
    title: data.introtitle
  };
};
