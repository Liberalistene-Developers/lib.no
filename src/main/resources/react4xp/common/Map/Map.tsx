import * as React from 'react';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapProps {
  address?: string;
  position?: number[];
}

interface NominatimResult {
  lat: string;
  lon: string;
}

export const Map: React.FC<MapProps> = ({
  address = 'Allegaten 6, 4400 Flekkefjord',
  position = [58.2953903, 6.6580986]
}) => {
  const [pos, setPos] = useState<number[]>(position);
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
            setPos([lat, lon].map(parseFloat));
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
      // @ts-expect-error - react-leaflet types may be incomplete for center prop
      center={pos as [number, number]}
      zoom={17}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        // @ts-expect-error - react-leaflet types may be incomplete for attribution prop
        attribution='&amp;copy <a href="http://osm.org/copyright" rel="noreferrer">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pos as [number, number]}>
        <Popup>
          {`${address}`}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
