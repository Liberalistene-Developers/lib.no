import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'

import { ErrorBoundary } from '../shared/ErrorBoundary'

const Map = lazy(() => import('./Map'))

const Fallback = () => (
  <div>Will show map in preview/production</div>
)

export const MapLoader = ({
  address,
  position
}) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <Map address={address} position={position} />
      </Suspense>
    </ErrorBoundary>
  )
}

MapLoader.propTypes = {
  address: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.number)
}

MapLoader.defaultProps = {
  address: 'Allegaten 6, 4400 Flekkefjord',
  position: [58.2953903, 6.6580986]
}

export default (props) => <MapLoader {...props} /> // eslint-disable-line react/display-name
