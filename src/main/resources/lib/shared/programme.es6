const contentLib = require('/lib/xp/content');

const Programme = {
  Section: 'lib.no:programme-section',
  Part: 'lib.no:programme-part',
  Conclusion: 'lib.no:programme-conclusion',
};

const getChildren = (search) => contentLib.getChildren({ count: 999, ...search });

export const getConclusions = (search) => {
  const children = getChildren(search);
  
  // log.info(JSON.stringify(children, null, 4));
  
  if (children.count) {
    return children
      .hits
      .filter(({ type }) => type === Programme.Conclusion)
      .map(({
        _id: key,
        displayName: conclusion,
      }) => ({ key, conclusion }));
  }
  
  return [];
};

export const getParts = (search) => {
  const children = getChildren(search);
  
  // log.info(JSON.stringify(children, null, 4));

  if (children && children.count) {
    return children
        .hits
        .filter(({ type }) => type === Programme.Part || type === Programme.Conclusion)
        .map(({
          _id: partKey,        
          _path: key, 
          type,
          displayName: partTitle,
          data: {
            description: partDescription,
            tags = [],
          } = {},
          page: {
            regions: {
              main: {
                components = [],
              } = {},
            } = {},
          } = {},     
          ...rest   
        }) => {
          const [{
            config: {
              conclusionTitle = '',
            } = {},
          } = {}] = (components && components.filter(({ descriptor }) => descriptor === Programme.Part)) || {};
          
          const conclusions = getConclusions({ key });
          
          log.info(JSON.stringify(rest, null, 4));

          if (type === Programme.Part) {
            return {
              type,
              key: partKey,
              title: partTitle,
              description: partDescription,
              conclusionTitle,
              conclusions,
              tags,
            };              
          }
          
          return {
            type,
            key: partKey,
            title: partTitle,
          };      
        });
  }
    
  return [];
};

export const getSections = (search) => {
  const children = getChildren(search);
  
  // log.info(JSON.stringify(children, null, 4));
  
  if (children && children.count) {
    return children
      .hits
      .filter(({ type }) => type === Programme.Section)
      .map(({
        _id: sectionKey,        
        _path: key, 
        displayName: sectionTitle,
        data: {
          description: sectionDescription,
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
        };
      });    
  }
    
  return [];
};