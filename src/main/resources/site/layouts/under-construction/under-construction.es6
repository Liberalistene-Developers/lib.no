const portal = require('/lib/xp/portal')
const thymeleaf = require('/lib/thymeleaf')

// Resolve the view
const view = resolve('under-construction.html')

exports.get = function (req) {
  // Find the current component.
  const component = portal.getComponent()

  // Define the model
  const model = {
    topRegion: component.regions.top,
    contentRegion: component.regions.content
  }

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model)

  // Return the result
  return {
    body: body,
    contentType: 'text/html'
  }
}
