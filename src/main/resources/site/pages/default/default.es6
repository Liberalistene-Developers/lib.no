const portal = require('/lib/xp/portal')
const thymeleaf = require('/lib/thymeleaf')

const libs = {
  menu: require('/lib/menu')
}

const { imageUrl } = require('/lib/shared/image')

// Specify the view file to use
const view = resolve('default.html')

// Handle the GET request
exports.get = function (req) {
  const site = portal.getSite()
  const { params: { debug = false } = {} } = req

  // Get the content that is using the page
  const content = portal.getContent()
  const config = portal.getSiteConfig()

  const menuItems = libs.menu.getMenuTree(1)

  if (debug) {
    log.info(JSON.stringify(menuItems, null, 2))
  }

  const {
    page: { regions: { main: mainRegion } = {} } = {},
    language,
    type: contentType
  } = content || {}

  const isFragment = contentType === 'portal:fragment'

  const { email, image: imageKey, phone, place, social = [] } = config || {}

  const some = [].concat(social).map(({ address }) => {
    if (debug) {
      log.info(address)
    }

    const url = address.match(
      /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/
    )
    const host = url.length > 1 && url[1].split('.')

    return {
      href: address,
      className: `fa-${host[host.length - 2]}`
    }
  })

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  // Prepare the model that will be passed to the view
  const model = {
    title: site.displayName,
    language: (language && language.split('_')[0]) || 'no',
    content,
    email,
    image: imageKey && imageUrl(imageKey, 'block(168,40)'),
    mainRegion: isFragment ? null : mainRegion,
    isFragment,
    phone,
    place,
    menu: menuItems,
    some
  }

  // Render the dynamic HTML with values from the model
  const body = thymeleaf.render(view, model)

  // Return the response object
  return { body }
}
