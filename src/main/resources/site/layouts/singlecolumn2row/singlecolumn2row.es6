const portal = require('/lib/xp/portal')
const thymeleaf = require('/lib/thymeleaf')

// Resolve the view
const view = resolve('singlecolumn2row.html')

exports.get = function (req) {
  // Find the current component.
  const component = portal.getComponent()

  const {
    config: {
      background,
      borderbottom: borderBottom,
      fullwidth: fullWidth,
      paddingbottom: paddingBottom,
      paddingtop: paddingTop,
      reverseroworder = false
    },
    regions: {
      top: topRegion,
      bottom: bottomRegion
    }
  } = component || {}

  // Define the model
  const model = {
    background,
    borderBottom,
    bottomRegion,
    fullWidth,
    paddingBottom,
    paddingTop,
    topRegion,
    orderClass: reverseroworder ? 'reverse' : ''
  }

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model)

  // Return the result
  return {
    body,
    contentType: 'text/html'
  }
}
