import {sanitizeComponentPaths, type ComponentData} from '/react4xp/utils/pathSanitizer';

describe('pathSanitizer', () => {
  describe('sanitizeComponentPaths', () => {
    // Suppress console.warn during tests
    const originalWarn = console.warn;
    beforeEach(() => {
      console.warn = jest.fn();
    });
    afterEach(() => {
      console.warn = originalWarn;
    });

    it('should return components unchanged if all paths are valid', () => {
      const components: ComponentData[] = [
        {component: {path: '/main/0'}},
        {component: {path: '/main/1'}},
        {component: {path: '/main/2'}},
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components).toEqual(components);
      expect(result.hadChanges).toBe(false);
    });

    it('should fix malformed path "/"', () => {
      const components: ComponentData[] = [
        {component: {path: '/'}},
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components[0].component?.path).toBe('/main/0');
      expect(result.hadChanges).toBe(true);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] [PathSanitizer] Found malformed path: "/"'),
        expect.anything()
      );
    });

    it('should fix multiple malformed paths with sequential indices', () => {
      const components: ComponentData[] = [
        {component: {path: '/'}},
        {component: {path: '/'}},
        {component: {path: '/'}},
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components[0].component?.path).toBe('/main/0');
      expect(result.components[1].component?.path).toBe('/main/1');
      expect(result.components[2].component?.path).toBe('/main/2');
      expect(result.hadChanges).toBe(true);
    });

    it('should start malformed path indices after existing valid paths', () => {
      const components: ComponentData[] = [
        {component: {path: '/main/0'}},
        {component: {path: '/main/1'}},
        {component: {path: '/'}},
        {component: {path: '/'}},
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components[0].component?.path).toBe('/main/0');
      expect(result.components[1].component?.path).toBe('/main/1');
      expect(result.components[2].component?.path).toBe('/main/2');
      expect(result.components[3].component?.path).toBe('/main/3');
      expect(result.hadChanges).toBe(true);
    });

    it('should handle components without component property', () => {
      const components: ComponentData[] = [
        {someOtherProp: 'value'},
        {component: {path: '/main/0'}},
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components).toEqual(components);
      expect(result.hadChanges).toBe(false);
    });

    it('should handle components without path property', () => {
      const components: ComponentData[] = [
        {component: {someProp: 'value'}},
        {component: {path: '/main/0'}},
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components).toEqual(components);
      expect(result.hadChanges).toBe(false);
    });

    it('should use custom region name when provided', () => {
      const components: ComponentData[] = [
        {component: {path: '/'}},
      ];

      const result = sanitizeComponentPaths(components, 'sidebar');

      expect(result.components[0].component?.path).toBe('/sidebar/0');
      expect(result.hadChanges).toBe(true);
    });

    it('should preserve other component properties', () => {
      const components: ComponentData[] = [
        {
          component: {
            path: '/',
            type: 'part',
            descriptor: 'com.example:mypart',
          },
        },
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components[0].component?.path).toBe('/main/0');
      expect(result.components[0].component?.type).toBe('part');
      expect(result.components[0].component?.descriptor).toBe('com.example:mypart');
    });

    it('should handle empty array', () => {
      const components: ComponentData[] = [];

      const result = sanitizeComponentPaths(components);

      expect(result.components).toEqual([]);
      expect(result.hadChanges).toBe(false);
    });

    it('should fix paths that do not match /main/X pattern', () => {
      const components: ComponentData[] = [
        {component: {path: '/sidebar/0'}},
        {component: {path: 'invalid'}},
      ];

      const result = sanitizeComponentPaths(components);

      expect(result.components[0].component?.path).toBe('/main/0');
      expect(result.components[1].component?.path).toBe('/main/1');
      expect(result.hadChanges).toBe(true);
    });
  });
});
