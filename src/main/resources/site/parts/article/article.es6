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
      headerColor,
      headerPosition,
      ingressInImage = false,
      titleInImage = false
    } = {}
  } = component || {}

  const {
    displayName: title,
    data: {
      date: datePublished,
      description = '',
      ingress = '',
      text = '',
      image = '',
      tags = '',
      author = []
    } = {}
  } = content || {}

  const authors = [].concat(author)

  // log.info(JSON.stringify(content, null, 4));
  // log.info(JSON.stringify(author, null, 4))

  const props = {
    headerColor,
    headerPosition,
    ingressInImage: !!ingressInImage,
    titleInImage: !!titleInImage,
    title,
    datePublished,
    image: imageUrl(image, 'full'),
    description,
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
        image: imageUrl(imageKey, 'square(40)')
      }
    }),
    ingress: processHtml(ingress),
    text: processHtml(text)
  }

  return React4xp.render('Article', props, request)
}
