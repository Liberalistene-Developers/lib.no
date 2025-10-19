/**
 * Mock helpers for Enonic XP server-side libraries
 */

export const createMockContent = (overrides: Record<string, unknown> = {}) => ({
  _id: 'mock-id',
  _name: 'mock-name',
  _path: '/content/mock-path',
  displayName: 'Mock Content',
  type: 'mock:type',
  data: {},
  ...overrides,
});

export const createMockRequest = (overrides: Record<string, unknown> = {}) => ({
  method: 'GET',
  scheme: 'http',
  host: 'localhost',
  port: '8080',
  path: '/site/default/master/mock',
  url: 'http://localhost:8080/site/default/master/mock',
  params: {},
  headers: {},
  cookies: {},
  branch: 'master',
  mode: 'live',
  ...overrides,
});

export const createMockComponent = (type: string, config: Record<string, unknown> = {}) => ({
  path: '/main/0',
  type: 'part',
  descriptor: type,
  config,
});

export const createMockImageData = (overrides: Record<string, unknown> = {}) => ({
  url: 'http://localhost:8080/mock-image.jpg',
  alternativeText: 'Mock image',
  ...overrides,
});
