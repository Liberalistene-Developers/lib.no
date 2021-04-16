const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')
const { processHtml } = require('/lib/shared/html')

exports.get = function (request) {
  const component = portal.getComponent()

  const {
    config: {
      candidate = [],
      showrole = false,
      imagesize = '',
      imagetype = false
    } = {}
  } = component

  const candidates = [].concat(candidate)

  const props = {
    showRole: !!showrole,
    imagesize,
    imagetype: !!imagetype,
    items: candidates.map(({
      role,
      description,
      person: personId
    }) => {
      const {
        displayName: person,
        _path: personPath,
        data: {
          image: imageKey
        }
      } = contentLib.get({ key: personId })

      log.info(JSON.stringify(person, null, 4))

      return {
        itemId: personId,
        name: person,
        role,
        shortDescription: processHtml(description),
        url: portal
          .pageUrl({
            path: personPath
          }),
        image: imageUrl(imageKey, 'full')
      }
    })
  }

  return React4xp.render('CandidateList', props, request)
}
