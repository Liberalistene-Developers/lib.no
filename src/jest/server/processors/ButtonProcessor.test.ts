jest.mock('/lib/xp/content', () => ({get: jest.fn()}));
jest.mock('/lib/xp/portal', () => ({pageUrl: jest.fn()}));
jest.mock('/react4xp/utils/logger', () => ({logger: {error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn()}}));

import {buttonProcessor} from '/react4xp/parts/Button/ButtonProcessor';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

const mockGetContent = getContent as jest.Mock;
const mockPageUrl = pageUrl as jest.Mock;

type ProcessorArgs = Parameters<typeof buttonProcessor>[0];
const makeArgs = (config: Record<string, unknown>): ProcessorArgs =>
  ({component: {config}} as unknown as ProcessorArgs);

describe('buttonProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('error paths', () => {
    it('should return url: undefined preserving title when urlSelector is missing', () => {
      const result = buttonProcessor(makeArgs({buttonText: 'Click'}));

      expect(result).toMatchObject({
        title: 'Click',
        url: undefined,
        target: undefined,
        className: 'medium-margin'
      });
    });

    it('should return url: undefined when urlSelector._selected is missing', () => {
      const result = buttonProcessor(makeArgs({buttonText: 'Click', urlSelector: {}}));

      expect(result).toMatchObject({url: undefined, target: undefined, className: 'medium-margin'});
    });

    it('should return url: undefined when getContent throws on internal link', () => {
      mockGetContent.mockImplementation(() => {
        throw new Error('Content not found');
      });

      const result = buttonProcessor(makeArgs({
        buttonText: 'Click',
        urlSelector: {_selected: 'intern', intern: {url: 'bad-key'}}
      }));

      expect(result).toMatchObject({url: undefined, target: undefined, className: 'medium-margin'});
    });

    it('should return url: empty string when internal content not found', () => {
      mockGetContent.mockReturnValue(null);

      const result = buttonProcessor(makeArgs({
        buttonText: 'Click',
        urlSelector: {_selected: 'intern', intern: {url: 'missing-key'}}
      }));

      expect(result).toMatchObject({title: 'Click', url: '', className: 'medium-margin'});
    });
  });

  describe('happy paths', () => {
    it('should resolve external url with target', () => {
      const result = buttonProcessor(makeArgs({
        buttonText: 'Visit',
        urlSelector: {_selected: 'extern', extern: {externUrl: 'https://example.com', target: '_blank'}}
      }));

      expect(result).toMatchObject({title: 'Visit', url: 'https://example.com', target: '_blank', className: 'medium-margin'});
    });

    it('should resolve internal url via pageUrl', () => {
      mockGetContent.mockReturnValue({_id: 'abc', _path: '/about', displayName: 'About'});
      mockPageUrl.mockReturnValue('/about');

      const result = buttonProcessor(makeArgs({
        buttonText: 'Learn More',
        urlSelector: {_selected: 'intern', intern: {url: 'abc'}}
      }));

      expect(result).toMatchObject({title: 'Learn More', url: '/about', className: 'medium-margin'});
    });

    it('should return empty url when intern url key is missing', () => {
      const result = buttonProcessor(makeArgs({
        buttonText: 'Click',
        urlSelector: {_selected: 'intern', intern: {}}
      }));

      expect(result).toMatchObject({url: '', className: 'medium-margin'});
    });
  });
});
