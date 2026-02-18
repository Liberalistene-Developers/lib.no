jest.mock('/lib/xp/content', () => ({get: jest.fn()}));
jest.mock('/lib/xp/portal', () => ({pageUrl: jest.fn(() => '/mock-url'), processHtml: jest.fn((p: {value: string}) => p.value || '')}));
jest.mock('/react4xp/utils/image', () => ({imageUrl: jest.fn(() => null)}));
jest.mock('/react4xp/utils/html', () => ({processHtml: jest.fn((html: string) => html || '')}));

import {articleProcessor} from '/react4xp/parts/article/ArticleProcessor';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

const mockGetContent = getContent as jest.Mock;
const mockPageUrl = pageUrl as jest.Mock;

type ProcessorArgs = Parameters<typeof articleProcessor>[0];
const makeArgs = (data: Record<string, unknown> = {}, config: Record<string, unknown> = {}): ProcessorArgs =>
  ({
    component: {config},
    content: {displayName: 'Test Article', data}
  } as unknown as ProcessorArgs);

describe('articleProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('error paths', () => {
    it('should filter out authors where content lookup returns null', () => {
      mockGetContent.mockReturnValue(null);

      const result = articleProcessor(makeArgs({author: ['missing-author-id']}));

      expect(result.authors).toEqual([]);
    });

    it('should handle missing author field gracefully', () => {
      const result = articleProcessor(makeArgs());
      expect(result.authors).toEqual([]);
    });
  });

  describe('happy paths', () => {
    it('should include author when content lookup succeeds', () => {
      mockGetContent.mockReturnValue({
        _id: 'author-1',
        _path: '/persons/author',
        displayName: 'John Doe',
        data: {}
      });
      mockPageUrl.mockReturnValue('/persons/author');

      const result = articleProcessor(makeArgs({author: ['author-1']}));

      expect(result.authors).toHaveLength(1);
      expect(result.authors[0]).toMatchObject({
        person: 'John Doe',
        personUrl: '/persons/author'
      });
    });

    it('should use content displayName as title', () => {
      const result = articleProcessor(makeArgs());
      expect(result.title).toBe('Test Article');
    });
  });
});
