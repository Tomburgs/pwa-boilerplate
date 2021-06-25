import handleFetchError from './handleFetchError';

const executeGet = (request: RequestInfo): Promise<any> => (
  fetch(request)
    .then(res => res.json())
    .catch(handleFetchError)
);

export default executeGet;
