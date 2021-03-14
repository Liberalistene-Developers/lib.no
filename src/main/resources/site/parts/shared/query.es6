const contentLib = require('/lib/xp/content');

const getChildren = (search) => contentLib.getChildren(search);

export const getItems = (search, contentType) => {
  const children = getChildren(search);
  
  // log.info(JSON.stringify(children, null, 4));
  
  const items = children.count && children
    .hits
    .filter(({ type }) => type ? type === contentType : true)
    .map(({
      _id: key,
    }) => key);

  return items;
};

export const runQuery = (key, count, type, sortMethod = undefined, start = 0) => {
  const sort = sortMethod ? `_modifiedTime ${sortMethod}` : undefined;
  
  const search = {
    key,
    start,
    count,
    sort,
  };
  
  return getItems(search, type);
};

export const findItems = (type, key, sort, count, start = 0) => {
  switch (sort) {
    case 'normal': {
      const list = runQuery(key, count, type, undefined, 0);
      
      return list;
    }
    
    default: {
      const list = runQuery(key, count, type, sort === 'asc' ? 'ASC' : 'DESC', 0);
      
      return list;
    }
  }
}