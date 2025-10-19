import {buildParentPathQuery, forceArray, extractList} from '/react4xp/utils/guillotine/helpers';

describe('guillotine/helpers', () => {
  describe('buildParentPathQuery', () => {
    it('should build a query string from parent path', () => {
      const result = buildParentPathQuery('/articles');
      expect(result).toBe("_parentPath = '/content/articles'");
    });

    it('should handle root path', () => {
      const result = buildParentPathQuery('/');
      expect(result).toBe("_parentPath = '/content/'");
    });

    it('should handle nested paths', () => {
      const result = buildParentPathQuery('/articles/2024/january');
      expect(result).toBe("_parentPath = '/content/articles/2024/january'");
    });

    it('should handle paths without leading slash', () => {
      const result = buildParentPathQuery('articles');
      expect(result).toBe("_parentPath = '/contentarticles'");
    });
  });

  describe('forceArray', () => {
    it('should convert single value to array', () => {
      const result = forceArray('hello');
      expect(result).toEqual(['hello']);
    });

    it('should return array unchanged', () => {
      const input = ['one', 'two', 'three'];
      const result = forceArray(input);
      expect(result).toEqual(input);
    });

    it('should return empty array for undefined', () => {
      const result = forceArray(undefined);
      expect(result).toEqual([]);
    });

    it('should return empty array for null', () => {
      const result = forceArray(null);
      expect(result).toEqual([]);
    });

    it('should handle numbers', () => {
      const result = forceArray(42);
      expect(result).toEqual([42]);
    });

    it('should handle objects', () => {
      const obj = {id: '123', name: 'Test'};
      const result = forceArray(obj);
      expect(result).toEqual([obj]);
    });

    it('should handle empty arrays', () => {
      const result = forceArray([]);
      expect(result).toEqual([]);
    });
  });

  describe('extractList', () => {
    const mockImageMapper = (item: {url?: string; data?: {image?: unknown}}) => ({
      id: (item as {id?: string}).id,
      title: (item.data as {title?: string})?.title,
    });

    it('should extract items from guillotine response', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {id: '1', data: {title: 'Article 1'}},
              {id: '2', data: {title: 'Article 2'}},
            ],
          },
        },
      };

      const mapper = () => mockImageMapper;
      const result = extractList(mapper)(response);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({id: '1', title: 'Article 1'});
      expect(result[1]).toEqual({id: '2', title: 'Article 2'});
    });

    it('should filter out items without data property', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {id: '1', data: {title: 'Valid'}},
              {id: '2'}, // No data property
              {id: '3', data: {title: 'Also Valid'}},
            ],
          },
        },
      };

      const mapper = () => mockImageMapper;
      const result = extractList(mapper)(response);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({id: '1', title: 'Valid'});
      expect(result[1]).toEqual({id: '3', title: 'Also Valid'});
    });

    it('should handle empty query array', () => {
      const response = {
        data: {
          guillotine: {
            query: [],
          },
        },
      };

      const mapper = () => mockImageMapper;
      const result = extractList(mapper)(response);

      expect(result).toEqual([]);
    });

    it('should handle missing guillotine property', () => {
      const response = {
        data: {},
      };

      const mapper = () => mockImageMapper;
      const result = extractList(mapper)(response);

      expect(result).toEqual([]);
    });

    it('should handle missing data property', () => {
      const response = {};

      const mapper = () => mockImageMapper;
      const result = extractList(mapper)(response);

      expect(result).toEqual([]);
    });

    it('should handle null response', () => {
      const mapper = () => mockImageMapper;
      const result = extractList(mapper)(null as never);

      expect(result).toEqual([]);
    });

    it('should apply imageMapper to images in items', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: '1',
                data: {
                  image: {
                    url: 'http://example.com/image.jpg',
                    data: {alternativeText: 'Test image'},
                  },
                },
              },
            ],
          },
        },
      };

      const mapper = (imageMap: (img: {url?: string; data?: {alternativeText?: string}}) => {url?: string; alternativeText?: string}) =>
        (item: {id?: string; data?: {image?: {url?: string; data?: {alternativeText?: string}}}}) => {
          const image = item.data?.image;
          return {
            id: item.id,
            image: image ? imageMap(image) : null,
          };
        };

      const result = extractList(mapper)(response);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '1',
        image: {
          url: 'http://example.com/image.jpg',
          alternativeText: 'Test image',
        },
      });
    });
  });
});
