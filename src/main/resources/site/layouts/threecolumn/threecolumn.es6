const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

// Resolve the view  
const view = resolve('threecolumn.html');

exports.get = function(req) {
  // Find the current component.
  const component = portal.getComponent();

  // Define the model
  const {
    config: {
      fullwidth: fullWidth,
      borderbottom: borderBottom,
    },
    regions: {
      left: leftRegion,
      middle: middleRegion,
      right: rightRegion,
    }
  } = component;
  

  const model = {
    borderBottom,
    fullWidth,
    leftRegion,
    middleRegion,
    rightRegion,
  };

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model);

  // Return the result
  return {
    body: body,
    contentType: 'text/html'
  };
};