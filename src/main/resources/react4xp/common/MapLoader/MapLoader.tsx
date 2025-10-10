import * as React from 'react';

const Fallback: React.FC = () => (
  <div>Will show map in preview/production</div>
);

interface MapLoaderProps {
  address?: string;
  position?: number[];
}

interface MapProps {
  address?: string;
  position?: number[];
}

export const MapLoader: React.FC<MapLoaderProps> = ({
  address = 'Allegaten 6, 4400 Flekkefjord',
  position = [58.2953903, 6.6580986]
}) => {
  const [MapComponent, setMapComponent] = React.useState<React.ComponentType<MapProps> | null>(null);
  const [leafletLoaded, setLeafletLoaded] = React.useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!leafletLoaded) return;

    // Only load Map on client-side after leaflet is loaded
    // @ts-expect-error - Dynamic imports are supported at runtime but may not match tsconfig module setting
    import('../Map/Map').then(module => {
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
