/**
 * Under Construction page controller
 * In React4xp v6, actual rendering is handled by /site/app.js via site.xml mappings
 * This controller exists so Content Studio can list "Under construction" as a page template option
 */

import type {Request, Response} from '@enonic-types/core';

export function get(_request: Request): Response {
  // With React4xp v6 global mapping, this is never actually called
  // The app.js controller handles all page rendering
  // This file just needs to exist for Content Studio to recognize the page descriptor
  return {
    status: 200,
    body: ''
  };
}
