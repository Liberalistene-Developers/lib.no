
import PropTypes from 'prop-types'

import { CandidatePresentationItem } from '../shared/CandidatePresentationItem'

export const CandidatePresentationList = ({
  items,
  highlighted = true,
  preText
}) => (
  <div className="candidate-presentation list">
    {items.slice(0, highlighted ? 1 : 0).map((item) => (
      <CandidatePresentationItem key={item.itemID} {...item} className="main" preText={preText} />
    ))}
    {items.slice(highlighted ? 1 : 0).map((item) => (
      <CandidatePresentationItem key={item.itemID} {...item} />
    ))}
  </div>
)

CandidatePresentationList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    itemID: PropTypes.string
  })),
  preText: PropTypes.string,
  highlighted: PropTypes.bool
}

CandidatePresentationList.defaultProps = {
  items: [],
  preText: '',
  highlighted: true
}

export default (props) => <CandidatePresentationList {...props} /> // eslint-disable-line react/display-name
