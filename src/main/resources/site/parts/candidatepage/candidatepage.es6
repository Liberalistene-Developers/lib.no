const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')
const { processHtml } = require('/lib/shared/html')

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    config: {
      image: artImage
    } = {}
  } = component || {}

  const {
    displayName: name,
    data: {
      person = [],
      image = '',
      ingress = '',
      description = '',
      position = '',
      place = ''
    } = {}
  } = content || {}

  const persons = []
    .concat(person)
    .map((personID) => {
      const {
        displayName: personName,
        _path: personPath,
        data: {
          image: imageKey,
          'short-description': shortDescription,
          description: personDescription,
          email,
          phone
        } = {},
        ...rest
      } = contentLib.get({ key: personID }) || {}

      if (debug) {
        log.info(JSON.stringify(rest, null, 2))
      }

      return {
        title: name || personName,
        ingress: processHtml(ingress || shortDescription),
        description: processHtml(description || personDescription),
        email,
        phone,
        image: imageUrl(image || imageKey, 'full'),
        fancyImage: ((artImage && true) || false),
        artImage: imageUrl(artImage, 'full'),
        position: `${position}, ${place}`
      }
    })

  // log.info(JSON.stringify(content, null, 4));
  // log.info(JSON.stringify(author, null, 4))

  const props = {
    ...((persons.length > 0 && persons[0]) || {})
  }

  return React4xp.render('CandidatePage', props, request)
}
