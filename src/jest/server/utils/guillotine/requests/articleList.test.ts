import {buildQueryArticleList, extractArticleList} from '/react4xp/utils/guillotine/requests/articleList';

describe('articleList guillotine requests', () => {
  describe('buildQueryArticleList', () => {
    it('should return a GraphQL query string', () => {
      const query = buildQueryArticleList();

      expect(typeof query).toBe('string');
      expect(query).toContain('query(');
      expect(query).toContain('guillotine');
    });

    it('should include required parameters', () => {
      const query = buildQueryArticleList();

      expect(query).toContain('$first: Int');
      expect(query).toContain('$offset: Int');
      expect(query).toContain('$sort: String');
      expect(query).toContain('$parentPathQuery: String');
    });

    it('should query for article content type', () => {
      const query = buildQueryArticleList();

      expect(query).toContain('contentTypes: ["lib.no:article"]');
    });

    it('should request article fields', () => {
      const query = buildQueryArticleList();

      expect(query).toContain('id: _id');
      expect(query).toContain('url: pageUrl');
      expect(query).toContain('name: displayName');
      expect(query).toContain('datePublished: date');
      expect(query).toContain('shortDescription: ingress');
    });

    it('should include image fields', () => {
      const query = buildQueryArticleList();

      expect(query).toContain('image {');
      expect(query).toContain('media_Image');
      expect(query).toContain('media_Vector');
      expect(query).toContain('alternativeText: caption');
    });
  });

  describe('extractArticleList', () => {
    it('should extract empty list from null response', () => {
      const result = extractArticleList(null);

      expect(result).toEqual([]);
    });

    it('should extract empty list from undefined response', () => {
      const result = extractArticleList(undefined);

      expect(result).toEqual([]);
    });

    it('should extract empty list from response without data', () => {
      const response = {};
      const result = extractArticleList(response);

      expect(result).toEqual([]);
    });

    it('should extract article data from valid response', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'article-1',
                name: 'Test Article',
                url: '/articles/test',
                data: {
                  datePublished: '2024-01-01',
                  shortDescription: {
                    processedHtml: '<p>Test description</p>'
                  },
                  image: {
                    url: '/images/test.jpg',
                    data: {
                      alternativeText: 'Test Image Alt'
                    }
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractArticleList(response);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'article-1',
        name: 'Test Article',
        url: '/articles/test',
        datePublished: '2024-01-01',
        shortDescription: '<p>Test description</p>',
        image: {
          url: '/images/test.jpg',
          alternativeText: 'Test Image Alt'
        }
      });
    });

    it('should handle articles without images', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'article-2',
                name: 'Article Without Image',
                url: '/articles/no-image',
                data: {
                  datePublished: '2024-01-02',
                  shortDescription: {
                    processedHtml: '<p>No image</p>'
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractArticleList(response);

      expect(result).toHaveLength(1);
      expect(result[0].image).toBeUndefined();
    });

    it('should handle articles without short description', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'article-3',
                name: 'Article Without Description',
                url: '/articles/no-desc',
                data: {
                  datePublished: '2024-01-03'
                }
              }
            ]
          }
        }
      };

      const result = extractArticleList(response);

      expect(result).toHaveLength(1);
      expect(result[0].shortDescription).toBe('');
    });

    it('should filter out items without data property', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'article-4',
                name: 'Minimal Article',
                url: '/articles/minimal'
                // No data property
              }
            ]
          }
        }
      };

      const result = extractArticleList(response);

      expect(result).toHaveLength(0);
    });

    it('should handle multiple articles', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'article-1',
                name: 'Article 1',
                url: '/articles/1',
                data: {
                  datePublished: '2024-01-01',
                  shortDescription: {
                    processedHtml: '<p>Description 1</p>'
                  }
                }
              },
              {
                id: 'article-2',
                name: 'Article 2',
                url: '/articles/2',
                data: {
                  datePublished: '2024-01-02',
                  shortDescription: {
                    processedHtml: '<p>Description 2</p>'
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractArticleList(response);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('article-1');
      expect(result[1].id).toBe('article-2');
    });
  });
});
