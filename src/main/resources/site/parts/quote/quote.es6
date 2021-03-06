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
    displayName: title,
    data: {
      description = '',
      qoute = '',
      image = '',
      tags = '',
      author = []
    } = {}
  } = content || {}

  const authors = [].concat(author)

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
    log.info(JSON.stringify(author, null, 4))
  }

  const props = {
    title,
    image: imageUrl(image),
    qoute: processHtml(qoute),
    description: processHtml(description),
    tags,
    authors: authors.map((authorID) => {
      const {
        displayName: person,
        _path: personPath,
        data: {
          image: imageKey
        } = {},
        ...rest
      } = contentLib.get({ key: authorID }) || {}

      if (debug) {
        log.info(JSON.stringify(rest, null, 4))
      }

      return {
        authorID,
        personUrl: portal
          .pageUrl({
            path: personPath
          }),
        person,
        image: imageUrl(imageKey, 'block(96,128)')
      }
    })
  }

  return React4xp.render(component, props, request)
}
