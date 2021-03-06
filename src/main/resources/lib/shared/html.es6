const portal = require('/lib/xp/portal')

export const processHtml = (value) => {
  if (value) {
    try {
      const html = portal.processHtml({ value })

      return html
    } catch (ex) {
      log.error(ex.message)

      return ''
    }
  }

  return ''
}
