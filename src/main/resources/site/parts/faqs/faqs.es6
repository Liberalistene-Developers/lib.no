const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('../shared/image');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      data: {
        faq = [],
      } = {},
    } = content;

    const faqs = [].concat(faq);

    // log.info(JSON.stringify(content, null, 4));
    // log.info(JSON.stringify(author, null, 4))

    const props = {
      faqs: faqs.map((faqID) => {
        const {
          _path: faqPath,
          displayName: question,
          data: {
            answer,
          },
          ...rest
        } = contentLib.get({ key: faqID });

        log.info(JSON.stringify(rest, null, 4));

        return {
          faqID,
          faqUrl: portal
            .pageUrl({
              path: faqPath,
            }),
          question,
          answer,
        };
      }),
    };

    return React4xp.render(component, props, request);
};
