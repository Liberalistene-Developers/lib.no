const portal = require('/lib/xp/portal');

export const processHtml = (value) => value ? 
  portal.processHtml({ value })
  : '';
