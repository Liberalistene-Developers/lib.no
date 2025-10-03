import {processHtml as portalProcessHtml} from '/lib/xp/portal';

export const processHtml = (value?: string): string => {
  if (value) {
    try {
      const html = portalProcessHtml({value});
      return html;
    } catch (ex) {
      const error = ex as Error;
      log.error(error.message);
      return '';
    }
  }
  return '';
};
