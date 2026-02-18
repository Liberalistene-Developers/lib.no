jest.mock('/lib/xp/content', () => ({get: jest.fn()}));
jest.mock('/lib/xp/portal', () => ({pageUrl: jest.fn(() => '/mock-url')}));
jest.mock('/react4xp/utils/image', () => ({imageUrl: jest.fn(() => null)}));
jest.mock('/react4xp/utils/html', () => ({processHtml: jest.fn((html: string) => html || '')}));
jest.mock('/react4xp/utils/board', () => ({mapPerson: jest.fn(() => ({person: 'Mock Person'}))}));

import {eventProcessor} from '/react4xp/parts/event/EventProcessor';
import {get as getContent} from '/lib/xp/content';

const mockGetContent = getContent as jest.Mock;

type ProcessorArgs = Parameters<typeof eventProcessor>[0];
const makeArgs = (data: Record<string, unknown> = {}, config: Record<string, unknown> = {}): ProcessorArgs =>
  ({
    component: {config},
    content: {displayName: 'Test Event', data}
  } as unknown as ProcessorArgs);

describe('eventProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('error paths', () => {
    it('should filter out speakers where content lookup returns null', () => {
      mockGetContent.mockReturnValue(null);

      const result = eventProcessor(makeArgs({
        schedule: [{
          name: 'Day 1',
          description: '',
          date: '2024-01-01',
          topics: [{topic: 'Talk 1', speaker: ['missing-speaker-id']}]
        }]
      }));

      expect(result.schedules[0].topics[0].speakers).toEqual([]);
    });

    it('should handle missing schedule gracefully', () => {
      const result = eventProcessor(makeArgs());
      expect(result.schedules).toEqual([]);
    });

    it('should handle missing organizers gracefully', () => {
      const result = eventProcessor(makeArgs());
      expect(result.organizers).toEqual([]);
    });

    it('should handle missing speakers gracefully', () => {
      const result = eventProcessor(makeArgs());
      expect(result.speakers).toEqual([]);
    });

    it('should return empty map array when map_geopoint is missing', () => {
      const result = eventProcessor(makeArgs());
      expect(result.map).toEqual([]);
    });
  });

  describe('happy paths', () => {
    it('should parse map coordinates from map_geopoint string', () => {
      const result = eventProcessor(makeArgs({map_geopoint: '59.9139,10.7522'}));
      expect(result.map).toEqual([59.9139, 10.7522]);
    });

    it('should include speaker when content lookup succeeds', () => {
      mockGetContent.mockReturnValue({
        _id: 'speaker-1',
        _path: '/persons/speaker',
        displayName: 'Jane Doe',
        data: {}
      });

      const result = eventProcessor(makeArgs({
        schedule: [{
          name: 'Day 1',
          description: '',
          date: '2024-01-01',
          topics: [{topic: 'Talk 1', speaker: ['speaker-1']}]
        }]
      }));

      expect(result.schedules[0].topics[0].speakers).toHaveLength(1);
    });

    it('should use content displayName as title', () => {
      const result = eventProcessor(makeArgs());
      expect(result.title).toBe('Test Event');
    });
  });
});
