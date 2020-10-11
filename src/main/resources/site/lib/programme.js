const contentLib = require('/lib/xp/content');

const Programme = {
  Section: 'lib.no:programme-section',
  Part: 'lib.no:programme-part',
  Conclusion: 'lib.no:programme-conclusion',
};

const getChildren = (search) => contentLib.getChildren(search);

export const getConclusions = (search) => {
  const children = getChildren(search);
  
  const conclusions = children.count && children
    .hits
    .filter(({ type }) => type === Programme.Conclusion)
    .map(({ _id: key, displayName: conclusion }) => ({ key, conclusion, }));

  return conclusions;
};

export const getParts = (search) => {
  const children = getChildren(search);

  const parts = children && children.count && children
    .hits
    .filter(({ type }) => Programme.Part)
    .map(({
      _id: partKey,        
      _path: key, 
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
    }) => {
      const [{
        config: {
          conclusionTitle = '',
        } = {},
      } = {}] = (components && components.filter(({ descriptor }) => descriptor === Programme.Part)) || {};
      
      const conclusions = getConclusions({ key });
      
      return {
        key: partKey,
        title: partTitle,
        description: partDescription,
        conclusionTitle,
        conclusions,
        tags,
      };
    });
};

export const getSections = (search) => {
  const children = getChildren(search);
  
  const sections = children && children.count && children
    .hits
    .filter(({ type }) => Programme.Section)
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
      
      return {
        key: sectionKey,
        title: sectionTitle,
        description: sectionDescription,
        sections,
      };
    });
};