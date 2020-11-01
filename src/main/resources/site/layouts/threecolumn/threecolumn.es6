const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

// Resolve the view  
const view = resolve('threecolumn.html');

exports.get = function(req) {
  // Find the current component.
  const component = portal.getComponent();

  // Define the model
  const model = {
    leftRegion: component.regions['left'],
    middleRegion: component.regions['middle'],
    rightRegion: component.regions['right'],
  };

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model);

  // Return the result
  return {
    body: body,
    contentType: 'text/html'
  };
};