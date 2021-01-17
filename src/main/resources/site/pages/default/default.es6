const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

const { imageUrl } = require('../../parts/shared/image');

// Specify the view file to use
var view = resolve('default.html');

// Handle the GET request
exports.get = function(req) {
    // Get the content that is using the page
    const content = portal.getContent();
    const config = portal.getSiteConfig();
    
    const {
      page: {
        regions: {
          main: mainRegion,
        },
      },
    } = content;
    
    const {
      email,
      image: imageKey,
      phone,
      place,
      social = [],
    } = config;
        
    const some = [].concat(social).map(({ address }) => {
      log.info(address);
      const url = address.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/);
      const host = url[1].split('.');
      
      return {
        href: address,
        className: `fa-${host[host.length - 2]}`,
      };
    })

    log.info(JSON.stringify(content, null, 4));

    // Prepare the model that will be passed to the view
    const model = {
      content,
      email,
      image: imageKey && imageUrl(imageKey, 'block(168,40)'), 
      mainRegion,
      phone,
      place,
      // title,
      some,
    };

    // Render the dynamic HTML with values from the model
    const body = thymeleaf.render(view, model);

    // Return the response object
    return { body }
};
