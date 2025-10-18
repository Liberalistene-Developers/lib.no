import type {Response} from '@enonic-types/core';

/**
 * Response processor that adds security headers to all responses
 *
 * Adds:
 * - Content-Security-Policy (CSP) headers
 * - X-Content-Type-Options
 * - X-Frame-Options
 * - Referrer-Policy
 *
 * Note: HTTPS enforcement (upgrade-insecure-requests) should be handled
 * at the infrastructure level (reverse proxy, CDN) rather than in CSP,
 * to avoid breaking local HTTP development.
 */
exports.responseProcessor = (req: unknown, res: Response): Response => {
  // Content Security Policy
  // This is a basic CSP - adjust based on your needs
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com", // unsafe-inline/eval needed for React; unpkg.com for Leaflet
    "style-src 'self' 'unsafe-inline' https://unpkg.com", // unsafe-inline needed for styled-components; unpkg.com for Leaflet CSS
    "img-src 'self' data: https: https://*.tile.openstreetmap.org", // https: for general images; OSM for map tiles
    "font-src 'self' data:",
    "connect-src 'self' https://nominatim.openstreetmap.org", // nominatim for geocoding
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com", // For video embeds
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'"
    // Note: upgrade-insecure-requests removed to support local HTTP development
    // HTTPS should be enforced at infrastructure level in production
  ].join('; ');

  const headers = res.headers || {};

  return {
    ...res,
    headers: {
      ...headers,
      'Content-Security-Policy': cspDirectives,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  };
};
