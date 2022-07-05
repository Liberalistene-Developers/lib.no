const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { getSections } = require('/lib/shared/programme')
// const getSections = () => [];

exports.get = function (request) {
  const content = portal.getContent()
  const component = portal.getComponent()

  const { config: { tableOfContent = false } = {} } = component || {}

  const {
    _path: key,
    displayName: title,
    data: { tags = '' } = {}
  } = content || {}

  const sections = getSections({
    key
  })

  log.info(JSON.stringify(content, null, 4))

  const props = {
    title,
    sections,
    tags,
    tableOfContent
  }

  return React4xp.render('ProgrammeMain', props, request)
}
