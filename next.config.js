/* eslint-disable */
const WorkboxPlugin = require('workbox-webpack-plugin');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const serviceWorkerPath = 'static/sw.js';
const serviceWorkerUrl = `/_next/${serviceWorkerPath}`;
const serviceWorkerDest = `.next/${serviceWorkerPath}`;

module.exports = {
    reactStrictMode: true,
    env: {
        serviceWorkerUrl
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        if (!isServer) {
            const additionalManifestEntries = fs
                .readdirSync('public')
                /*
                 * Add the public files to precache-manifest entries.
                 *
                 * We're creating an MD5 hash from file contents
                 * to know if they've changed, so that the service worker
                 * would know to recache them if they have.
                 */
                .map(file => ({
                    url: `/${file}`,
                    revision: crypto.createHash('md5').update(
                        Buffer.from(
                            fs.readFileSync(`public/${file}`)
                        )
                    ).digest('hex')
                }));

            config.plugins.push(
                new WorkboxPlugin.InjectManifest({
                    swSrc: path.resolve('src', 'sw', 'index.ts'),
                    swDest: path.resolve(serviceWorkerDest),
                    dontCacheBustURLsMatching: /^\/_next\/static\//,
                    additionalManifestEntries,
                    exclude: [
                        /^build-manifest\.json$/i,
                        /^react-loadable-manifest\.json$/i,
                        /\/react-refresh\.js$/i,
                        /\/_error\.js$/i,
                        /\.js\.map$/i,
                        /*
                         * Since we're using variable fonts
                         * we don't want to pre-cache any,
                         * otherwise we're downloading both
                         * variable & regular fonts.
                         */
                        /\.(ttf|woff)/i
                    ],
                    modifyURLPrefix: {
                        'static/': '/_next/static/'
                    }
                })
            );
        }

        return config;
    },
    headers: () => [{
        /*
         * Since we're outputing service worker
         * with static files in /_next/static directory
         * we have to return the service worker file with an additional header
         * so that the browser would know that it's safe to run it on the root scope.
         */
        source: serviceWorkerUrl,
        headers: [{
            key: 'service-worker-allowed',
            value: '/'
        }]
    }]
}
