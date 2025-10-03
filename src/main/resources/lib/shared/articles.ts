import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {processHtml} from './html';
import {imageUrl} from './image';

interface ArticleData {
  date?: string;
  ingress?: string;
  image?: string;
}

interface MappedArticle {
  itemId: string;
  name?: string;
  url?: string;
  datePublished?: string;
  shortDescription?: string;
  image?: ReturnType<typeof imageUrl>;
}

export const mapArticle = (itemId: string): MappedArticle => {
  const content = getContent({key: itemId});
  if (!content) {
    return {itemId};
  }

  const {
    displayName: name,
    _path: itemPath,
    data = {}
  } = content;

  const articleData = data as ArticleData;
  const {
    date: datePublished,
    ingress: shortDescription = '',
    image: imageKey
  } = articleData;

  return {
    itemId,
    name,
    url: itemPath ? pageUrl({path: itemPath}) : undefined,
    datePublished,
    shortDescription: processHtml(shortDescription),
    image: imageUrl(imageKey, 'block(459,295)', '')
  };
};
