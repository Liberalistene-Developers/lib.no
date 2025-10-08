import * as React from 'react';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

// @ts-expect-error - Dynamic imports are supported at runtime but may not match tsconfig module setting
const Map = lazy(() => import('./Map').then(module => ({ default: module.Map })));

const Fallback: React.FC = () => (
  <div>Will show map in preview/production</div>
);

interface MapLoaderProps {
  address?: string;
  position?: number[];
}

export const MapLoader: React.FC<MapLoaderProps> = ({
  address = 'Allegaten 6, 4400 Flekkefjord',
  position = [58.2953903, 6.6580986]
}) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <Map address={address} position={position} />
      </Suspense>
    </ErrorBoundary>
  );
};
