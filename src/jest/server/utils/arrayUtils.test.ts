import {toArray} from '/react4xp/utils/arrayUtils';

describe('arrayUtils', () => {
  describe('toArray', () => {
    it('should convert a single value to an array', () => {
      const result = toArray('hello');
      expect(result).toEqual(['hello']);
    });

    it('should return an array unchanged', () => {
      const input = ['one', 'two', 'three'];
      const result = toArray(input);
      expect(result).toEqual(input);
    });

    it('should convert null to an empty array', () => {
      const result = toArray(null);
      expect(result).toEqual([]);
    });

    it('should convert undefined to an empty array', () => {
      const result = toArray(undefined);
      expect(result).toEqual([]);
    });

    it('should handle numbers', () => {
      const result = toArray(42);
      expect(result).toEqual([42]);
    });

    it('should handle objects', () => {
      const obj = {key: 'value'};
      const result = toArray(obj);
      expect(result).toEqual([obj]);
    });

    it('should handle empty arrays', () => {
      const result = toArray([]);
      expect(result).toEqual([]);
    });
  });
});
