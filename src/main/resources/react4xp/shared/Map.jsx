import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({
  address,
  position,
}) => {
  if (!position || position.length < 2) {
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={17}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {`${address}`}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

Map.propTypes = {
  address: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.number),
};

Map.defaultProps = {
  address: 'Allegaten 6, 4400 Flekkefjord',
  position: [58.2953903, 6.6580986],
};

export default Map;

export {
  Map,
}
