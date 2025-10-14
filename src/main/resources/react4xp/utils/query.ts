import {getChildren, GetChildContentParams} from '/lib/xp/content';

interface SearchParams {
  key: string;
  start?: number;
  count?: number;
  sort?: string;
}

interface ContentItem {
  _id: string;
  type?: string;
}

interface ChildrenResult {
  count: number;
  hits: ContentItem[];
}

export const findChildren = (
  search: SearchParams,
  contentType?: string
): ContentItem[] | undefined => {
  const children = getChildren(search as GetChildContentParams) as ChildrenResult;

  if (!children.count) {
    return undefined;
  }

  return children.hits.filter(({type}) =>
    type ? type === contentType : true
  );
};

export const getItems = (
  search: SearchParams,
  contentType?: string
): string[] | undefined => {
  const items = findChildren(search, contentType);

  if (!items) {
    return undefined;
  }

  return items.map(({_id: key}) => key);
};

export const runQuery = (
  key: string,
  count: number,
  type?: string,
  sortMethod?: string,
  start: number = 0
): string[] | undefined => {
  const sort = sortMethod ? `_modifiedTime ${sortMethod}` : undefined;

  const search: SearchParams = {
    key,
    start,
    count,
    sort
  };

  return getItems(search, type);
};

export const findItems = (
  type: string,
  key: string,
  sort: string,
  count: number,
  start: number = 0,
  sortField?: string
): string[] | undefined => {
  let sortExpression: string | undefined;

  switch (sort) {
    case 'normal': {
      sortExpression = undefined;
      break;
    }
    case 'asc': {
      sortExpression = sortField ? `${sortField} ASC` : '_modifiedTime ASC';
      break;
    }
    case 'desc': {
      sortExpression = sortField ? `${sortField} DESC` : '_modifiedTime DESC';
      break;
    }
    default: {
      sortExpression = undefined;
    }
  }

  const search: SearchParams = {
    key,
    start,
    count,
    sort: sortExpression
  };

  return getItems(search, type);
};
