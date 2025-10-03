import type {Request, Response} from '@enonic-types/core';

/* eslint-disable @typescript-eslint/no-require-imports */
const guillotineLib = require('/lib/guillotine');
const graphQlLib = require('/lib/graphql');
const graphqlPlaygroundLib = require('/lib/graphql-playground');
const authLib = require('/lib/xp/auth');
/* eslint-enable @typescript-eslint/no-require-imports */

const CORS_HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  // 'Access-Control-Allow-Origin': '*'
};

const SCHEMA = guillotineLib.createSchema();

// ----------------------------------------------  FOR USE IN CONTROLLERS:    ------------------------------------

interface QueryVariables {
  [key: string]: unknown;
}

interface GraphQLResponse {
  data?: unknown;
  errors?: Array<{
    errorType: string;
    message: string;
  }>;
}

export const executeQuery = (query: string, variables?: QueryVariables): GraphQLResponse =>
  graphQlLib.execute(SCHEMA, query, variables);

interface ErrorResponse {
  status: number;
  body: {
    errors: Array<{
      errorType: string;
      message: string;
    }>;
  };
}

const createError = (status: number, message: string): ErrorResponse => ({
  status,
  body: {
    errors: [
      {
        errorType: `${status}`,
        message
      }
    ]
  }
});

// GraphQL playground
export function get(req: Request): Response {
  const {params: {debug = false} = {}} = req;

  if (debug) {
    log.info(JSON.stringify(req, null, 4));
  }

  if (req.webSocket) {
    return {
      // @ts-expect-error - webSocket is valid but not in DefaultResponse type
      webSocket: {
        subProtocols: ['graphql-ws']
      }
    };
  }

  // Simple auth control for the playground
  if (!authLib.hasRole('system.authenticated')) {
    return createError(401, 'Unauthorized');
  }

  if (!(authLib.hasRole('system.admin') || authLib.hasRole('system.admin.login'))) {
    return createError(403, 'Forbidden');
  }

  const body = graphqlPlaygroundLib.render();

  return {
    contentType: 'text/html; charset=utf-8',
    body
  };
}

// ----------------------------------------------  FRONTEND EXPOSED METHODS:  ------------------------------------

/** Guillotine API endpoint exposed to browsers - if you add a mapping to site.xml
 *  (e.g. <mapping controller="/services/guillotineApi/guillotineApi.js" order="50"><pattern>/api/headless</pattern>)
 *
 * ------------   IMPORTANT!   --------------   IMPORTANT!   --------------   IMPORTANT!   --------------
 *
 * Before you add that mapping and expose this API, consider this:
 * This API is as-is, and as bare-bone as it gets. Guillotine is a read-only interface, but this endpoint still exposes
 * the possibility to send ANY QUERY, so any data will technically be readable from your repo.
 * This is meant for developers to expand from, and it's strongly recommended to implement your own security solution
 * according to your specific use case and requirements.
 *
 *-------------------------------------------------------------------------------------------------------
 *
 * @param req req.body must be a JSON-string, parseable to an object with parameters: body and variables.
 * These will be run through the guillotine engine and JSON data will be returned.
 */
export function post(req: Request): Response {
  const {params: {debug = false} = {}} = req;

  const body = JSON.parse(req.body || '{}') as {
    query: string;
    variables?: QueryVariables;
  };

  const queryResult = executeQuery(body.query, body.variables);

  let status = 200;
  if (queryResult.errors) {
    status = 400;
    log.error(
      `${queryResult.errors.length} guillotine error${queryResult.errors.length === 1 ? '' : 's'}: ${JSON.stringify(queryResult.errors)}`
    );
    log.error(JSON.stringify(queryResult.errors, null, 4));

    if (debug) {
      log.info('The error happened with these request.body.variables: ' + JSON.stringify(body.variables));
    }
  }

  return {
    status,
    contentType: 'application/json',
    headers: CORS_HEADERS,
    body: queryResult as unknown as Record<string, unknown>
  };
}

export function options(_req: Request): Response {
  return {
    contentType: 'text/plain;charset=utf-8',
    headers: CORS_HEADERS
  };
}
