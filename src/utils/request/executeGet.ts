import handleFetchError from './handleFetchError';

export default (request: RequestInfo): Promise<any> => (
    fetch(request)
        .then(res => res.json())
        .catch(handleFetchError)
);
