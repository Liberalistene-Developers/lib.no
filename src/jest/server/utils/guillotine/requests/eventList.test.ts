import {buildQueryEventList, extractEventList} from '/react4xp/utils/guillotine/requests/eventList';

describe('eventList guillotine requests', () => {
  describe('buildQueryEventList', () => {
    it('should return a GraphQL query string', () => {
      const query = buildQueryEventList();

      expect(typeof query).toBe('string');
      expect(query).toContain('query(');
      expect(query).toContain('guillotine');
    });

    it('should include required parameters', () => {
      const query = buildQueryEventList();

      expect(query).toContain('$first: Int');
      expect(query).toContain('$offset: Int');
      expect(query).toContain('$sort: String');
      expect(query).toContain('$parentPathQuery: String');
    });

    it('should query for event content type', () => {
      const query = buildQueryEventList();

      expect(query).toContain('contentTypes: ["lib.no:event"]');
    });

    it('should request event fields', () => {
      const query = buildQueryEventList();

      expect(query).toContain('id: _id');
      expect(query).toContain('url: pageUrl');
      expect(query).toContain('name: displayName');
      expect(query).toContain('from');
      expect(query).toContain('to');
      expect(query).toContain('place');
      expect(query).toContain('shortDescription: ingress');
    });

    it('should include image fields', () => {
      const query = buildQueryEventList();

      expect(query).toContain('image {');
      expect(query).toContain('media_Image');
      expect(query).toContain('media_Vector');
      expect(query).toContain('alternativeText: caption');
    });
  });

  describe('extractEventList', () => {
    it('should extract empty list from null response', () => {
      const result = extractEventList(null);

      expect(result).toEqual([]);
    });

    it('should extract empty list from undefined response', () => {
      const result = extractEventList(undefined);

      expect(result).toEqual([]);
    });

    it('should extract empty list from response without data', () => {
      const response = {};
      const result = extractEventList(response);

      expect(result).toEqual([]);
    });

    it('should extract event data from valid response', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'event-1',
                name: 'Test Event',
                url: '/events/test',
                data: {
                  from: '2024-01-01T10:00:00',
                  to: '2024-01-01T12:00:00',
                  place: '123 Main St',
                  shortDescription: {
                    processedHtml: '<p>Test event description</p>'
                  },
                  image: {
                    url: '/images/event.jpg',
                    data: {
                      alternativeText: 'Event Image Alt'
                    }
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractEventList(response);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'event-1',
        title: 'Test Event',
        url: '/events/test',
        date: '2024-01-01T10:00:00',
        to: '2024-01-01T12:00:00',
        location: {
          address: '123 Main St'
        },
        text: '<p>Test event description</p>',
        image: {
          url: '/images/event.jpg',
          alternativeText: 'Event Image Alt'
        }
      });
    });

    it('should handle events without images', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'event-2',
                name: 'Event Without Image',
                url: '/events/no-image',
                data: {
                  from: '2024-01-02T10:00:00',
                  shortDescription: {
                    processedHtml: '<p>No image</p>'
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractEventList(response);

      expect(result).toHaveLength(1);
      expect(result[0].image).toBeUndefined();
    });

    it('should handle events without short description', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'event-3',
                name: 'Event Without Description',
                url: '/events/no-desc',
                data: {
                  from: '2024-01-03T10:00:00'
                }
              }
            ]
          }
        }
      };

      const result = extractEventList(response);

      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('');
    });

    it('should handle events without to date', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'event-4',
                name: 'Event Without End Date',
                url: '/events/no-end',
                data: {
                  from: '2024-01-04T10:00:00',
                  shortDescription: {
                    processedHtml: '<p>No end date</p>'
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractEventList(response);

      expect(result).toHaveLength(1);
      expect(result[0].to).toBeUndefined();
    });

    it('should handle events without location', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'event-5',
                name: 'Event Without Location',
                url: '/events/no-location',
                data: {
                  from: '2024-01-05T10:00:00',
                  shortDescription: {
                    processedHtml: '<p>No location</p>'
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractEventList(response);

      expect(result).toHaveLength(1);
      expect(result[0].location).toEqual({
        address: undefined
      });
    });

    it('should filter out items without data property', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'event-6',
                name: 'Minimal Event',
                url: '/events/minimal'
                // No data property
              }
            ]
          }
        }
      };

      const result = extractEventList(response);

      expect(result).toHaveLength(0);
    });

    it('should handle multiple events', () => {
      const response = {
        data: {
          guillotine: {
            query: [
              {
                id: 'event-1',
                name: 'Event 1',
                url: '/events/1',
                data: {
                  from: '2024-01-01T10:00:00',
                  shortDescription: {
                    processedHtml: '<p>Description 1</p>'
                  }
                }
              },
              {
                id: 'event-2',
                name: 'Event 2',
                url: '/events/2',
                data: {
                  from: '2024-01-02T10:00:00',
                  shortDescription: {
                    processedHtml: '<p>Description 2</p>'
                  }
                }
              }
            ]
          }
        }
      };

      const result = extractEventList(response);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('event-1');
      expect(result[1].id).toBe('event-2');
    });
  });
});
