const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

// Resolve the view  
const view = resolve('singlecolumn.html');

exports.get = function(req) {
  // Find the current component.
  const component = portal.getComponent();

  const {
    config: {
      fullwidth: fullWidth,
      borderbottom: borderBottom,
    },
    regions: {
      content: contentRegion,
    },
  } = component;


  // Define the model
  const model = {
    borderBottom,
    contentRegion,
    fullWidth,
  };

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model);

  // Return the result
  return {
    body: body,
    contentType: 'text/html'
  };
};