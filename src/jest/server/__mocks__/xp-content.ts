// Stub for /lib/xp/content — overridden per test with jest.mock()
export const get = (): null => null;
export const query = (): {hits: []; total: 0; count: 0} => ({hits: [], total: 0, count: 0});
