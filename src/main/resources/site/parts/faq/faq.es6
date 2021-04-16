const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { processHtml } = require('/lib/shared/html')

exports.get = function (request) {
  const content = portal.getContent()
  const component = portal.getComponent()
  const {
    displayName: question,
    data: {
      answer,
      tags
    }
  } = content

  const {
    config: {
      expandable,
      expanded
    } = {}
  } = component

  const props = {
    expandable,
    expanded,
    question,
    answer: processHtml(answer),
    tags
  }

  return React4xp.render('FaqItem', props, request, { clientRender: true })
}
