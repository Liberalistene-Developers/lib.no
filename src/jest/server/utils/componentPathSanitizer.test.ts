import {sanitizeAndPersistComponentPaths} from '/react4xp/utils/componentPathSanitizer';
import type {ComponentDataAndProps} from '@enonic/react-components';

describe('componentPathSanitizer', () => {
  // Suppress console.warn during tests
  const originalWarn = console.warn;
  beforeEach(() => {
    console.warn = jest.fn();
  });
  afterEach(() => {
    console.warn = originalWarn;
  });

  describe('sanitizeAndPersistComponentPaths', () => {
    it('should return components unchanged if all paths are correct and sequential', () => {
      const components = [
        {component: {path: '/main/0'}, data: {}},
        {component: {path: '/main/1'}, data: {}},
        {component: {path: '/main/2'}, data: {}},
      ] as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect((result[0].component as {path: string}).path).toBe('/main/0');
      expect((result[1].component as {path: string}).path).toBe('/main/1');
      expect((result[2].component as {path: string}).path).toBe('/main/2');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should renumber components with non-sequential indices', () => {
      const components = [
        {component: {path: '/main/0'}, data: {}},
        {component: {path: '/main/5'}, data: {}},
        {component: {path: '/main/10'}, data: {}},
      ] as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect((result[0].component as {path: string}).path).toBe('/main/0');
      expect((result[1].component as {path: string}).path).toBe('/main/1');
      expect((result[2].component as {path: string}).path).toBe('/main/2');
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] [PathSanitizer] Fixing path: "/main/5" → "/main/1"'),
        expect.anything()
      );
    });

    it('should fix malformed paths and assign sequential indices', () => {
      const components = [
        {component: {path: '/'}, data: {}},
        {component: {path: '/main/1'}, data: {}},
        {component: {path: 'invalid'}, data: {}},
      ] as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect((result[0].component as {path: string}).path).toBe('/main/0');
      expect((result[1].component as {path: string}).path).toBe('/main/1');
      expect((result[2].component as {path: string}).path).toBe('/main/2');
    });

    it('should sort components by their path index before renumbering', () => {
      const components = [
        {component: {path: '/main/5', type: 'part', descriptor: 'lib.no:third'}, data: {}},
        {component: {path: '/main/1', type: 'part', descriptor: 'lib.no:first'}, data: {}},
        {component: {path: '/main/3', type: 'part', descriptor: 'lib.no:second'}, data: {}},
      ] as unknown as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect((result[0].component as {descriptor: string}).descriptor).toBe('lib.no:first');
      expect((result[1].component as {descriptor: string}).descriptor).toBe('lib.no:second');
      expect((result[2].component as {descriptor: string}).descriptor).toBe('lib.no:third');
      expect((result[0].component as {path: string}).path).toBe('/main/0');
      expect((result[1].component as {path: string}).path).toBe('/main/1');
      expect((result[2].component as {path: string}).path).toBe('/main/2');
    });

    it('should handle components without component property', () => {
      const components = [
        {data: {someData: 'value'}},
        {component: {path: '/main/0'}, data: {}},
      ] as unknown as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      // Should return same number of components without throwing
      expect(result).toHaveLength(2);
      // At least one should have data
      expect(result.some(r => r.data)).toBe(true);
    });

    it('should handle components without path property', () => {
      const components = [
        {component: {type: 'part'}, data: {}},
        {component: {path: '/main/0'}, data: {}},
      ] as unknown as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect(result).toHaveLength(2);
      // Component without path gets sorted last and stays without path
      expect((result[0].component as {path: string}).path).toBe('/main/0');
      expect((result[1].component as {type: string}).type).toBe('part');
    });

    it('should add data property if missing', () => {
      const components = [
        {component: {path: '/main/0'}},
      ] as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect(result[0].data).toBeDefined();
      expect(result[0].data).toEqual({});
    });

    it('should preserve component with regions', () => {
      const components = [
        {
          component: {
            path: '/main/0',
            regions: {
              main: {
                name: 'Main',
                components: [],
              },
            },
          },
          data: {
            regions: {
              main: {
                name: 'Main',
                components: [],
              },
            },
          },
        },
      ] as unknown as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect((result[0].component as {path: string}).path).toBe('/main/0');
      expect(result[0].data?.regions).toBeDefined();
    });

    it('should update nested component paths in regions when parent path changes', () => {
      const components = [
        {
          component: {
            path: '/main/5',
            regions: {
              main: {
                name: 'Main',
                components: [
                  {component: {path: '/main/5/main/0'}, data: {}},
                  {component: {path: '/main/5/main/1'}, data: {}},
                ],
              },
            },
          },
          data: {},
        },
      ] as unknown as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect((result[0].component as {path: string}).path).toBe('/main/0');
      const regions = (result[0].component as unknown as {regions: {
        main: {components: ComponentDataAndProps[]};
      }}).regions;
      expect((regions.main.components[0].component as {path: string}).path).toBe('/main/0/main/0');
      expect((regions.main.components[1].component as {path: string}).path).toBe('/main/0/main/1');
    });

    it('should handle empty array', () => {
      const components: ComponentDataAndProps[] = [];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect(result).toEqual([]);
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should preserve other component properties', () => {
      const components = [
        {
          component: {
            path: '/main/5',
            type: 'part',
            descriptor: 'com.example:mypart',
          },
          data: {customData: 'value'},
        },
      ] as unknown as ComponentDataAndProps[];

      const result = sanitizeAndPersistComponentPaths(components, {} as never);

      expect((result[0].component as {path: string}).path).toBe('/main/0');
      expect((result[0].component as {type: string}).type).toBe('part');
      expect((result[0].component as {descriptor: string}).descriptor).toBe('com.example:mypart');
      expect((result[0].data as {customData: string}).customData).toBe('value');
    });
  });
});
