import {type ComponentType, type FC, useEffect, useState} from 'react';
import {logger} from '@utils/logger';

/**
 * Props for the Map component
 */
interface MapProps {
  /** Address to display on the map (geocoded if position not provided) */
  address?: string;
  /** Map center position as [latitude, longitude] */
  position?: number[] | [number, number];
}

/**
 * Nominatim geocoding API result
 */
interface NominatimResult {
  /** Latitude as string */
  lat: string;
  /** Longitude as string */
  lon: string;
}

/**
 * react-leaflet components loaded dynamically
 */
interface LeafletComponents {
  MapContainer: ComponentType<{
    center: [number, number];
    zoom: number;
    scrollWheelZoom: boolean;
    className: string;
    children: React.ReactNode;
  }>;
  TileLayer: ComponentType<{
    attribution: string;
    url: string;
  }>;
  Marker: ComponentType<{
    position: [number, number];
    children: React.ReactNode;
  }>;
  Popup: ComponentType<{
    children: React.ReactNode;
  }>;
}

/**
 * Map component displays an interactive OpenStreetMap with location marker.
 *
 * Dynamically imports react-leaflet to avoid bundling Leaflet in vendors.js,
 * significantly reducing initial bundle size. Renders a Leaflet map using
 * react-leaflet with OpenStreetMap tiles. If only an address is provided (no
 * position), automatically geocodes it using the Nominatim API. Client-side
 * only component (returns null during SSR). Shows loading state while react-leaflet
 * loads, and error message if geocoding or loading fails. The map is fixed at
 * zoom level 17 with scroll wheel zoom disabled.
 *
 * @example
 * ```tsx
 * <Map
 *   address="Stortinget, Oslo"
 *   position={[59.9127, 10.7461]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Address-only (will geocode)
 * <Map address="Karl Johans gate 22, Oslo" />
 * ```
 */
export const Map: FC<MapProps> = ({
  address = 'Allegaten 6, 4400 Flekkefjord',
  position = [58.2953903, 6.6580986]
}) => {
  const [pos, setPos] = useState<[number, number]>(position as [number, number]);
  const [isSsr, setIsSsr] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [leafletComponents, setLeafletComponents] = useState<LeafletComponents | null>(null);

  useEffect(() => {
    setIsSsr(false);

    // Dynamically import react-leaflet to avoid bundling it in vendors.js
    // @ts-expect-error - Dynamic imports supported at runtime but not in ES2015 module setting
    import('react-leaflet').then((module: LeafletComponents) => {
      setLeafletComponents(module);
    }).catch((error: Error) => {
      logger.error('Failed to load react-leaflet', error);
      setHasError(true);
    });
  }, []);

  useEffect(() => {
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

  // Wait for react-leaflet to load
  if (!leafletComponents) {
    return (
      <div className="map-loading p-4 bg-gray-50 border border-gray-200 rounded">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
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

  const {MapContainer, TileLayer, Marker, Popup} = leafletComponents;

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
  );
};
