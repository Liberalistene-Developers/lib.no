const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const { config: { title, centerheading = false } = {} } = component || {}

  const {
    data: { missions = [] }
  } = content

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const props = {
    title,
    headingClassName: centerheading && 'center',
    items: (missions ? [].concat(missions) : []).map(
      ({ image: imageKey, title, description }) => {
        const image = imageKey && {
          ...imageUrl(imageKey, 'full'),
          url: portal.attachmentUrl({ id: imageKey })
        }

        return {
          description,
          image,
          title
        }
      }
    )
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('MissionsBlock', props, request)
}
