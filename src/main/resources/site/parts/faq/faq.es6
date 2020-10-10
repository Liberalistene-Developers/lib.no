const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();
    const {
      displayName: question,
      data: {
        answer,
        tags,
      },
    } = content;
    const props = { question, answer, tags };

    return React4xp.render(component, props, request);
};
