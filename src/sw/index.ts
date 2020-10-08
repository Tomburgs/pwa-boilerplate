/*
 * Service Worker.
 *
 * Using workbox to handle default implementations.
 *
 * For assets we use CacheFirst with an expiration.
 * For API calls we use NetworkFirst.
 * For all others we use StaleWhileRevalidate.
 */

import { setCacheNameDetails, cacheNames } from 'workbox-core';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';

import deleteEntriesForCache from 'sw/utils/deleteEntriesForCache';
import Router from 'sw/utils/router';

/*
 * Fix incorrect self definition:
 * https://stackoverflow.com/questions/56356655/structuring-a-typescript-project-with-workers
 */
declare const self: ServiceWorkerGlobalScope;

/*
 * Set custom cache names for workbox
 * to be consistent with names.
 */
setCacheNameDetails({
    prefix: 'app',
    suffix: 'v1',
    precache: 'cache-runtime',
    runtime: 'cache-precache'
});

const { runtime: CACHE_NAME_RUNTIME } = cacheNames;

/*
 * Precache static build files.
 *
 * Set during build time using
 * workbox-webpack-plugin.
 */
precacheAndRoute([
    ...self.__WB_MANIFEST || [],
    {
        url: '/',
        revision: `${Date.now()}`
    }
]);

/*
 * On re-deploy delete all cached runtime requests.
 */
self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil(
        deleteEntriesForCache(CACHE_NAME_RUNTIME)
    );
});

self.addEventListener('install', () => {
    self.skipWaiting();
});

/*
 * Request caching.
 *
 * API calls -> NetworkFirst
 * Static assets -> CacheFirst
 * All others -> StaleWhileRevalidate
 */
const router = new Router(CACHE_NAME_RUNTIME);

router.ignoredRoutes = /\/webpack|\/react-refresh/;
router.setRoute(/\/api\//, NetworkFirst);
router.setRoute(/\/static\/|\.(js|css)/, CacheFirst);
router.setDefault(StaleWhileRevalidate);

export default {};
