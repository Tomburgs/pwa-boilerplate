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
import getBuildManifest from 'sw/utils/getBuildManifest';
import getBuildManifestPages from 'sw/utils/getBuildManifestPages';
import Router from 'sw/utils/router';

/*
 * Fix incorrect self definition:
 * https://stackoverflow.com/questions/56356655/structuring-a-typescript-project-with-workers
 */
declare const self: ServiceWorkerGlobalScope;
declare global {
    interface NextBuildManifest {
        [key: string]: Array<string>
    }

    interface ServiceWorkerGlobalScope {
        __BUILD_MANIFEST: NextBuildManifest,
        __BUILD_ID: string
    }
}

/*
 * Import build manifest script.
 */
importScripts(`/_next/static/${self.__BUILD_ID}/_buildManifest.js`);

/*
 * Set custom cache names for workbox
 * to be consistent with names.
 */
setCacheNameDetails({
  prefix: 'app',
  suffix: 'v1',
  runtime: 'cache-runtime',
  precache: 'cache-precache'
});

const { runtime: CACHE_NAME_RUNTIME } = cacheNames;

/*
 * Generate documents to pre-fetch
 */
const manifest = getBuildManifest();
const buildManifestPages = getBuildManifestPages();
const revision = `${Date.now()}`;

/*
 * Routes that we need to cache.
 */
const documentURLsToCache = buildManifestPages.map(url => ({
  url,
  revision
}));

/*
 * Get files which are required by documents.
 *
 * No need to add revision as their URLs include version.
 */
const documentFilesToCache = buildManifestPages.reduce<string[]>(
  (pages, name) => [
    ...pages,
    ...manifest[name]
  ],
  []
).map(url => ({
  url,
  revision: null
}));

/*
 * Precache static build files.
 *
 * Set during build time using
 * workbox-webpack-plugin.
 */
precacheAndRoute([
  ...self.__WB_MANIFEST || [],
  ...documentURLsToCache,
  ...documentFilesToCache
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
