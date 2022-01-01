const portal = require('/lib/xp/portal')
const thymeleaf = require('/lib/thymeleaf')

// Resolve the view
const view = resolve('fourcolumn.html')

exports.get = function (req) {
  // Find the current component.
  const component = portal.getComponent()

  // Define the model
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
      middleleft: middleLeftRegion,
      middleright: middleRightRegion,
      right: rightRegion
    }
  } = component || {}

  const [leftClassName, middleLeftClassName, middleRightClassName, rightClassName] = (columnsLayout && columnsLayout.split(',')) || []

  const model = {
    background,
    borderBottom,
    fullWidth,
    leftClassName,
    leftRegion,
    middleLeftClassName,
    middleLeftRegion,
    middleRightClassName,
    middleRightRegion,
    paddingBottom,
    paddingTop,
    rightClassName,
    rightRegion
  }

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model)

  // Return the result
  return {
    body: body,
    contentType: 'text/html'
  }
}
