import {getChildren as getContentChildren, GetChildContentParams} from '/lib/xp/content';

const Programme = {
  Section: 'lib.no:programme-section',
  Part: 'lib.no:programme-part',
  Conclusion: 'lib.no:programme-conclusion'
};

interface SearchParams {
  key: string;
  [key: string]: unknown;
}

interface Component {
  descriptor?: string;
  config?: {
    conclusionTitle?: string;
  };
}

interface PageRegion {
  components?: Component[];
}

interface ContentPage {
  regions?: {
    main?: PageRegion;
  };
}

interface ContentData {
  description?: string;
  tags?: string[];
}

interface ContentItem {
  _id: string;
  _path?: string;
  type?: string;
  displayName?: string;
  data?: ContentData;
  page?: ContentPage;
}

interface Conclusion {
  key: string;
  conclusion?: string;
}

interface ProgrammePart {
  type: string;
  key: string;
  title?: string;
  description?: string;
  conclusionTitle?: string;
  conclusions?: Conclusion[];
  tags?: string[];
}

interface ProgrammeSection {
  key: string;
  title?: string;
  description?: string;
  conclusionTitle?: string;
  parts: ProgrammePart[];
  tags?: string[];
}

const getChildren = (search: SearchParams) =>
  getContentChildren({count: 999, ...search} as GetChildContentParams);

export const getConclusions = (search: SearchParams): Conclusion[] => {
  const children = getChildren(search) as {count: number; hits: ContentItem[]};

  if (children.count) {
    return children.hits
      .filter(({type}) => type === Programme.Conclusion)
      .map(({_id: key, displayName: conclusion}) => ({key, conclusion}));
  }

  return [];
};

export const getParts = (
  search: SearchParams,
  debug: boolean = false
): ProgrammePart[] => {
  const children = getChildren(search) as {count: number; hits: ContentItem[]};

  if (children && children.count) {
    return children.hits
      .filter(
        ({type}) => type === Programme.Part || type === Programme.Conclusion
      )
      .map((item) => {
        const {
          _id: partKey,
          _path: key,
          type,
          displayName: partTitle,
          data = {},
          page = {}
        } = item;

        const {description: partDescription, tags = []} = data;

        const components =
          page.regions?.main?.components || [];

        const [firstPart] =
          components.filter(
            ({descriptor}) => descriptor === Programme.Part
          ) || [];

        const conclusionTitle =
          firstPart?.config?.conclusionTitle || 'Liberalistene vil:';

        const conclusions = getConclusions({key});

        if (debug) {
          log.info(JSON.stringify(item, null, 2));
        }

        if (type === Programme.Part) {
          return {
            type,
            key: partKey,
            title: partTitle,
            description: partDescription,
            conclusionTitle,
            conclusions,
            tags
          };
        }

        return {
          type: type || '',
          key: partKey,
          title: partTitle
        } as ProgrammePart;
      });
  }

  return [];
};

export const getSections = (search: SearchParams): ProgrammeSection[] => {
  const children = getChildren(search) as {count: number; hits: ContentItem[]};

  if (children && children.count) {
    return children.hits
      .filter(({type}) => type === Programme.Section)
      .map((item) => {
        const {
          _id: sectionKey,
          _path: key,
          displayName: sectionTitle,
          data = {},
          page = {}
        } = item;

        const {description: sectionDescription, tags = []} = data;

        const components =
          page.regions?.main?.components || [];

        const parts = getParts({key});

        const [firstSection] =
          components.filter(
            ({descriptor}) => descriptor === Programme.Section
          ) || [];

        const conclusionTitle =
          firstSection?.config?.conclusionTitle || 'Liberalistene vil:';

        return {
          key: sectionKey,
          title: sectionTitle,
          description: sectionDescription,
          conclusionTitle,
          parts,
          tags
        };
      });
  }

  return [];
};
