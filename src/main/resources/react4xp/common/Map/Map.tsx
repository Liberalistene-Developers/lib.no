import * as React from 'react';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {logger} from '/react4xp/utils/logger';

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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsSsr(false);

    if (position.length < 2 && address) {
      logger.debug('Geocoding address', {address});

      const addr = address.replace(/\n/g, ',').replace(/ /g, '+');
      logger.debug('Formatted address for geocoding', {formattedAddress: addr});

      fetch(`https://nominatim.openstreetmap.org/search?q=${addr}&format=json&polygon=1&addressdetails=1`)
        .then((result) => {
          if (!result.ok) {
            throw new Error(`Geocoding failed: ${result.status} ${result.statusText}`);
          }
          return result.json();
        })
        .then((result: NominatimResult[] | Response) => {
          logger.debug('Geocoding result', {result});
          if (Array.isArray(result) && result.length) {
            const [{ lat, lon }] = result;
            setPos([parseFloat(lat), parseFloat(lon)]);
            setHasError(false);
          } else {
            logger.warn('No geocoding results found', {address, formattedAddress: addr});
            // Keep default position if geocoding fails
          }

          return result;
        })
        .catch((error: Error) => {
          logger.error('Geocoding request failed', error);
          setHasError(true);
          // Keep default position if geocoding fails
        });
    }
  }, [position, address]);

  logger.debug('Map SSR state', {isSsr});

  // Don't render on server-side
  if (isSsr) {
    return null;
  }

  // Handle missing or invalid position
  if (!pos || pos.length < 2) {
    if (hasError) {
      return (
        <div className="map-error p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800">Unable to load map. Please check the address or try again later.</p>
        </div>
      );
    }
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
