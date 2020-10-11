const contentLib = require('/lib/xp/content');

const Programme = {
  Section: 'lib.no:programme-section',
  Part: 'lib.no:programme-part',
  Conclusion: 'lib.no:programme-conclusion',
};

const getChildren = (search) => contentLib.getChildren(search);

export const getConclusions = (search) => {
  const children = getChildren(search);
  
  // log.info(JSON.stringify(children, null, 4));
  
  const conclusions = children.count && children
    .hits
    .filter(({ type }) => type === Programme.Conclusion)
    .map(({
      _id: key,
      displayName: conclusion,
      data: {
        order = 0,
      },
    }) => ({ key, conclusion, order }))
    .sort((a, b) => a.order < b.order);

  return conclusions;
};

export const getParts = (search) => {
  const children = getChildren(search);
  
  // log.info(JSON.stringify(children, null, 4));

  const parts = children && children.count && children
    .hits
    .filter(({ type }) => Programme.Part)
    .map(({
      _id: partKey,        
      _path: key, 
      displayName: partTitle,
      data: {
        description: partDescription,
        order = 0,
        tags = [],
      } = {},
      page: {
        regions: {
          main: {
            components = [],
          } = {},
        } = {},
      } = {},        
    }) => {
      const [{
        config: {
          conclusionTitle = '',
        } = {},
      } = {}] = (components && components.filter(({ descriptor }) => descriptor === Programme.Part)) || {};
      
      const conclusions = getConclusions({ key });
      
      // log.info(JSON.stringify(conclusions, null, 4));

      return {
        key: partKey,
        title: partTitle,
        description: partDescription,
        conclusionTitle,
        conclusions,
        tags,
        order,
      };      
    })
    .sort((a, b) => a.order < b.order);
    
  return parts;
};

export const getSections = (search) => {
  const children = getChildren(search);
  
  // log.info(JSON.stringify(children, null, 4));
  
  const sections = children && children.count && children
    .hits
    .filter(({ type }) => Programme.Section)
    .map(({
      _id: sectionKey,        
      _path: key, 
      displayName: sectionTitle,
      data: {
        description: sectionDescription,
        order = 0,
        tags = [],
      } = {},
    }) => {
      const parts = getParts({ key });
      
      // log.info(JSON.stringify(parts, null, 4));
      
      return {
        key: sectionKey,
        title: sectionTitle,
        description: sectionDescription,
        parts,
        tags,
        order,
      };
    })
    .sort((a, b) => a.order < b.order);
    
  return sections;
};