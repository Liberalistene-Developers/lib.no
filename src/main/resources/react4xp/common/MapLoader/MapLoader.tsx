import {type ComponentType, type FC, useEffect, useState} from 'react';

/**
 * Fallback component shown while map is loading
 */
const Fallback: FC = () => (
  <div>Will show map in preview/production</div>
);

/**
 * Props for the MapLoader component
 */
interface MapLoaderProps {
  /** Address to display on the map */
  address?: string;
  /** Map center position as [latitude, longitude] */
  position?: number[];
}

/**
 * Props for the dynamically loaded Map component
 */
interface MapProps {
  /** Address to display on the map */
  address?: string;
  /** Map center position as [latitude, longitude] */
  position?: number[];
}

/**
 * MapLoader component lazy-loads the Map component with Leaflet dependencies.
 *
 * Dynamically loads Leaflet CSS and JavaScript from CDN, then code-splits
 * and loads the Map component only on the client side. Shows a fallback
 * message during loading. This pattern avoids including Leaflet in the
 * initial bundle and ensures SSR compatibility.
 *
 * @example
 * ```tsx
 * <MapLoader
 *   address="Stortinget, Oslo"
 *   position={[59.9127, 10.7461]}
 * />
 * ```
 */
export const MapLoader: FC<MapLoaderProps> = ({
  address = 'Allegaten 6, 4400 Flekkefjord',
  position = [58.2953903, 6.6580986]
}) => {
  const [MapComponent, setMapComponent] = useState<ComponentType<MapProps> | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet CSS and JS if not already loaded
    if (typeof window !== 'undefined' && !document.getElementById('leaflet-css')) {
      const css = document.createElement('link');
      css.id = 'leaflet-css';
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css';
      css.integrity = 'sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==';
      css.crossOrigin = '';
      document.head.appendChild(css);

      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.js';
      script.integrity = 'sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==';
      script.crossOrigin = '';
      script.onload = () => setLeafletLoaded(true);
      document.head.appendChild(script);
    } else if (typeof window !== 'undefined') {
      setLeafletLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!leafletLoaded) return;

    // Dynamic import for client-side code splitting. This code only runs in the browser.
    // tsconfig uses module: "ES2015" for GraalJS compatibility, but dynamic imports work
    // at runtime in modern browsers. TypeScript requires module >= "ES2020" for type checking.
    // @ts-expect-error - Dynamic imports supported at runtime but not in ES2015 module setting
    import('../Map/Map').then((module: {Map: ComponentType<{address?: string; position: number[]}>}) => {
      setMapComponent(() => module.Map);
    }).catch(() => {
      // Ignore import errors
    });
  }, [leafletLoaded]);

  // Don't render Map during server-side rendering or before it loads
  if (!MapComponent) {
    return <Fallback />;
  }

  return <MapComponent address={address} position={position} />;
};
