import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {processHtml} from './html';
import {imageUrl} from './image';

interface EventData {
  from?: string;
  to?: string;
  place?: string;
  ingress?: string;
  image?: string;
}

interface MappedEvent {
  itemId: string;
  title?: string;
  date?: string;
  to?: string;
  url?: string;
  location?: {
    address?: string;
  };
  text?: string;
  image?: ReturnType<typeof imageUrl>;
}

export const mapEvent = (itemId: string): MappedEvent => {
  const content = getContent({key: itemId});
  if (!content) {
    return {itemId};
  }

  const {
    displayName: title,
    _path: itemPath,
    data = {}
  } = content;

  const eventData = data as EventData;
  const {
    from: date,
    to,
    place: address,
    ingress: text = '',
    image: imageKey
  } = eventData;

  return {
    itemId,
    title,
    date,
    to,
    url: itemPath ? pageUrl({path: itemPath}) : undefined,
    location: {
      address
    },
    text: processHtml(text),
    image: imageUrl(imageKey, 'block(459,295)', '')
  };
};
