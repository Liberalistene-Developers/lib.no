const portal = require('/lib/xp/portal')
const thymeleaf = require('/lib/thymeleaf')

// Resolve the view
const view = resolve('twocolumn.html')

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
      columnsLayout = ''
    },
    regions: {
      left: leftRegion,
      right: rightRegion
    }
  } = component || {}

  const [leftClassName, rightClassName] = (columnsLayout && columnsLayout.split(',')) || []

  // Define the model
  const model = {
    background,
    borderBottom,
    fullWidth,
    leftClassName,
    leftRegion,
    paddingBottom,
    paddingTop,
    rightClassName,
    rightRegion
  }

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model)

  // Return the result
  return {
    body,
    contentType: 'text/html'
  }
}
