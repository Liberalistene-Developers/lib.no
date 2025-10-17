import * as React from 'react';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapProps {
  address?: string;
  position?: number[] | [number, number];
}

interface NominatimResult {
  lat: string;
  lon: string;
}

export const Map: React.FC<MapProps> = ({
  address = 'Allegaten 6, 4400 Flekkefjord',
  position = [58.2953903, 6.6580986]
}) => {
  const [pos, setPos] = useState<[number, number]>(position as [number, number]);
  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => {
    setIsSsr(false);

    if (position.length < 2 && address) {
      console.info(address);

      const addr = address.replace(/\n/g, ',').replace(/ /g, '+');
      console.info(addr);

      fetch(`https://nominatim.openstreetmap.org/search?q=${addr}&format=json&polygon=1&addressdetails=1`)
        .then((result) => {
          if (result.ok) {
            return result.json();
          }

          return result;
        })
        .then((result: NominatimResult[] | Response) => {
          console.info(result);
          if (Array.isArray(result) && result.length) {
            const [{ lat, lon }] = result;
            setPos([parseFloat(lat), parseFloat(lon)]);
          }

          return result;
        });
    }
  }, [position, address]);

  console.info(isSsr);

  if (isSsr || !pos || pos.length < 2) {
    return null;
  }

  return (
    <MapContainer
      // MapContainerProps extends MapOptions from leaflet, but without @types/leaflet
      // installed, TypeScript can't properly resolve the inherited props. The center prop
      // is valid and required - it's a [number, number] tuple for [lat, lng].
      // @ts-expect-error - MapOptions props not properly exposed without @types/leaflet
      center={pos}
      zoom={17}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        // TileLayer accepts attribution as a string prop, but the type definition
        // may not properly expose it due to the same leaflet types issue.
        // @ts-expect-error - TileLayer props not properly exposed without @types/leaflet
        attribution='&amp;copy <a href="http://osm.org/copyright" rel="noreferrer">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pos}>
        <Popup>
          {`${address}`}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
