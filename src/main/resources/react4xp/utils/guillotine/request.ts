/**
 * Guillotine frontend boilerplate, import from/below react4xp entries.
 * Performs a fetch POST call to a guillotine API endpoint.
 *
 * Usage: doGuillotineRequest(params);
 *
 * Params (object, mandatory):
 *      @param url (string, mandatory) URL to the guillotine API. This app comes with a default endpoint: ./guillotineApi.ts - which is controller mapped to '/api/headless'.
 *      @param query (string, mandatory) Valid guillotine query. See docs at https://developer.enonic.com/templates/headless-cms and https://github.com/enonic/lib-guillotine/blob/master/docs/api.adoc#fields-1
 *      @param extractDataFunc (override function, optional): Takes the output object of response.json() and returns data in the shape required by handleDataFunc. By default just passes the object through unchanged. Must take a response-data argument (object) and return something.
 *      @param handleDataFunc (override function, optional): Takes the output of extractDataFunc and does something with it. By default does nothing.
 *      @param handleResponseErrorFunc (override function, optional): Checks aspects of the API response. By default just checks the status code. Must take a response argument (object) and return it.
 *      @param catchErrorsFunc (override function, optional): Handles any errors that were thrown after the fetch.
 */

type FetchResponse = {
  status: number;
  statusText: string;
  url: string;
  json: () => Promise<unknown>;
};

interface GuillotineRequestParams {
  url: string;
  query: string;
  variables?: Record<string, unknown>;
  handleResponseErrorFunc?: (response: FetchResponse) => FetchResponse;
  extractDataFunc?: (responseData: unknown) => unknown;
  handleDataFunc?: (data: unknown) => void;
  catchErrorsFunc?: (error: Error) => void;
}

const PARAM_TYPES: Record<string, string> = {
  url: 'string',
  query: 'string',
  variables: 'object',
  handleResponseErrorFunc: 'function',
  extractDataFunc: 'function',
  handleDataFunc: 'function',
  catchErrorsFunc: 'function'
};

const checkParams = (params: unknown): Partial<GuillotineRequestParams> => {
  if (!params || typeof params !== 'object') {
    throw Error(
      'Missing or invalid params argument. Supply a valid object: doGuillotineRequest(params);'
    );
  }

  const paramsObj = params as Record<string, unknown>;

  Object.keys(paramsObj).forEach((key) => {
    const value = paramsObj[key];
    const expectedType = PARAM_TYPES[key];
    if (value && typeof value !== expectedType) {
      throw Error(
        `Invalid parameter type. Supply a valid '${key}' ${expectedType} parameter: doGuillotineRequest({${key}: <${expectedType}>, etc});`
      );
    }
  });

  if ((paramsObj.url as string || '').trim() === '') {
    throw Error(
      "Missing URL to the guillotine API. Supply a valid 'url' string parameter: doGuillotineRequest({url: '...', etc}); "
    );
  }
  if ((paramsObj.query as string || '').trim() === '') {
    throw Error(
      "Missing guillotine query. Supply a valid 'query' string parameter: doGuillotineRequest({query: '...', etc}); "
    );
  }

  return paramsObj as Partial<GuillotineRequestParams>;
};

const defaultHandleResponseErrorFunc = (response: FetchResponse): FetchResponse => {
  if (!(response.status < 300)) {
    throw Error(
      `Guillotine API response:\n\n${response.status} - ${response.statusText}.\n\nAPI url: ${response.url}\n\nInspect the request and/or the server log.`
    );
  }

  return response;
};

const defaultErrorFunc = (error: Error): void => {
  console.error(error);
};

const extractParamsOrDefaults = (params: unknown) => {
  const {
    url = '',
    query = '',
    variables = {},
    handleResponseErrorFunc = defaultHandleResponseErrorFunc,
    extractDataFunc = (responseData: unknown) => responseData,
    handleDataFunc = () => null,
    catchErrorsFunc = defaultErrorFunc
  } = checkParams(params);

  return {
    url,
    query,
    variables,
    handleResponseErrorFunc,
    extractDataFunc,
    handleDataFunc,
    catchErrorsFunc
  };
};

// ---------------------------------------------------------

const doGuillotineRequest = (params: GuillotineRequestParams): void => {
  const {
    url,
    query,
    variables,
    handleResponseErrorFunc,
    extractDataFunc,
    handleDataFunc,
    catchErrorsFunc
  } = extractParamsOrDefaults(params);

  console.log('[Guillotine] Request URL:', url);
  console.log('[Guillotine] Query:', query);
  console.log('[Guillotine] Variables:', variables);

  // Fetch is available in browser context where this client-side code runs
  (globalThis.fetch || fetch)(url, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    credentials: 'same-origin'
  })
    .then(handleResponseErrorFunc)
    .then((response: FetchResponse) => response.json())
    .then(extractDataFunc)
    .then(handleDataFunc)
    .catch(catchErrorsFunc);
};

export default doGuillotineRequest;
