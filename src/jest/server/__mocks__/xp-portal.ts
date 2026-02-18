// Stub for /lib/xp/portal — overridden per test with jest.mock()
export const pageUrl = (): string => '';
export const processHtml = ({value}: {value?: string}): string => value ?? '';
export const imageUrl = (): string => '';
export const attachmentUrl = (): string => '';
