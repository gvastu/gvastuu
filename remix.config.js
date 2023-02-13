/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	cacheDirectory: './node_modules/.cache/remix',
	ignoredRouteFiles: ['**/.*', '**/*.css'],
	serverDependenciesToBundle: [
    '@js-temporal/polyfill',
    /^react-merge-refs.*/,
    'react-modal-sheet',
  ],
}
