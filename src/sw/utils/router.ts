import {
    Router as WorkboxRouter,
    RegExpRoute
} from 'workbox-routing';
import {
    RouteHandler,
    RouteHandlerObject,
    cacheNames
} from 'workbox-core';
import { getCacheKeyForURL } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

interface Config {
    cacheName: string
}

interface StrategyClass {
    new(...args: any): RouteHandlerObject
}

export default class Router {
    private cacheName: string;
    private _ignoredRoutes: RegExp | undefined;
    private _workboxRouter: WorkboxRouter;

    constructor(cacheName: string) {
        this.cacheName = cacheName;
        this._workboxRouter = new WorkboxRouter();
        this._init();
    }

    private get config(): Config {
        return {
            cacheName: this.cacheName
        };
    }

    private register(...args: [RegExp, RouteHandler]): void {
        this._workboxRouter.registerRoute(
            new RegExpRoute(...args)
        );
    }

    private _init(): void {
        self.onfetch = this.handleFetch;
    }

    set ignoredRoutes(ignoredRoutes: RegExp) {
        this._ignoredRoutes = ignoredRoutes;
    }

    handleOfflineFetch = async (): Promise<Response | undefined> => {
        const cache = await self.caches.open(cacheNames.runtime);
        const cacheURL = getCacheKeyForURL('/');

        if (!cacheURL) {
            return;
        }

        const { pathname, search } = new URL(cacheURL);
        const document = await cache.match(`${pathname}${search}`);

        return document;
    }

    handleFetch = async (event: FetchEvent): Promise<void> => {
        const { request: { url, destination } } = event;

        if (this._ignoredRoutes && this._ignoredRoutes.test(url)) {
            return;
        }

        if (!navigator.onLine && destination === 'document') {
            const document = await this.handleOfflineFetch();

            if (document) {
                event.respondWith(document);
            }
        }

        const response = this._workboxRouter.handleRequest(event);

        if (!response) {
            return;
        }

        event.respondWith(response);
    }

    setRoute(
        route: RegExp,
        Strategy: StrategyClass
    ): void {
        this.register(
            route,
            new Strategy(this.config)
        );
    }

    setDefault(Strategy: StrategyClass): void {
        this._workboxRouter
            .setDefaultHandler(
                new Strategy(this.config)
            );
    }
}
