const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

// Resolve the view  
const view = resolve('threecolumn2row.html');

exports.get = function(req) {
  // Find the current component.
  const component = portal.getComponent();

  // Define the model
  const {
    config: {
      background,
      borderbottom: borderBottom,
      fullwidth: fullWidth,
      paddingbottom: paddingBottom,
      paddingtop: paddingTop,
      columnsLayout = '',
      reverseroworder = false,
    },
    regions: {
      top: topRegion,
      left: leftRegion,
      middle: middleRegion,
      right: rightRegion,
    }
  } = component;
  
  const [leftClassName, middleClassName, rightClassName] = columnsLayout.split(',');

  const model = {
    background,
    borderBottom,
    fullWidth,
    leftClassName,
    leftRegion,
    middleClassName,
    middleRegion,
    paddingBottom,
    paddingTop,
    rightClassName,
    rightRegion,
    orderClass: reverseroworder ? 'reverse' : '',
    topRegion,
  };

  // Render a thymeleaf template
  const body = thymeleaf.render(view, model);

  // Return the result
  return {
    body: body,
    contentType: 'text/html'
  };
};