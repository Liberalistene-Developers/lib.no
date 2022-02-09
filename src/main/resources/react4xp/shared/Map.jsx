import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export const Map = ({
  address,
  position
}) => {
  const [pos, setPos] = useState(position)

  useEffect(() => {
    if (position.length < 2 && address) {
      console.info(address)

      const addr = address.replace(/\n/g, ',').replace(/ /g, '+')
      console.info(addr)

      fetch(`https://nominatim.openstreetmap.org/search?q=${addr}&format=json&polygon=1&addressdetails=1`)
        .then((result) => {
          if (result.ok) {
            return result.json()
          }

          return result
        })
        .then((result) => {
          console.info(result)
          if (result && result.length) {
            const [{ lat, lon }] = result
            setPos([lat, lon].map(parseFloat))
          }

          return result
        })
    }
  }, [position, address])

  if (!pos || pos.length < 2) {
    return null
  }

  return (
    <MapContainer
      center={pos}
      zoom={17}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright" rel="noreferrer">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pos}>
        <Popup>
          {`${address}`}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

Map.propTypes = {
  address: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.number)
}

Map.defaultProps = {
  address: 'Allegaten 6, 4400 Flekkefjord',
  position: [58.2953903, 6.6580986]
}

export default (props) => <Map {...props} /> // eslint-disable-line react/display-name
