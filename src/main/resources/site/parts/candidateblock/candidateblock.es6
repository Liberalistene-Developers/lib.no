const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const { config: { title, centerheading = false } = {} } = component || {}

  const {
    data: { candidates = [] }
  } = content

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const props = {
    title,
    headingClassName: centerheading && 'center',
    items: (candidates ? [].concat(candidates) : []).map(
      ({ person: personKey, position }) => {
        const {
          displayName: name,
          data: { image: imageKey, email, phone } = {},
          ...rest
        } = contentLib.get({ key: personKey }) || {}

        if (debug) {
          log.info(JSON.stringify(rest, null, 2))
        }
        const image = imageKey && {
          ...imageUrl(imageKey, 'full'),
          url: portal.attachmentUrl({ id: imageKey })
        }

        return {
          name,
          email,
          image,
          phone,
          position
        }
      }
    )
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('LBCandidateBlock', props, request)
}
