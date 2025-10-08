// Import Workbox locally for better security and reliability
// Note: In a real implementation, you would include the workbox files in your project
// For now, we'll keep the CDN approach but with better error handling

importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

// Define core assets that should be cached for offline functionality
const CORE_ASSETS = [
	'/',
	'/index.html',
	// Add other core assets that make up your app shell
	// You might want to add specific CSS and JS file paths here
];

// Add error handling for Workbox initialization
let workboxAvailable = false;

try {
	if (typeof workbox !== 'undefined' && workbox) {
		workboxAvailable = true;

		// Configure Workbox with custom cache names
		workbox.core.setCacheNameDetails({
			prefix: 'weathy-app',
			suffix: 'v1',
		});

		// Register routes with more specific patterns
		// Using more precise regex patterns that don't include query parameters
		workbox.routing.registerRoute(
			new RegExp('^https://nominatim\\.openstreetmap\\.org/reverse'),
			new workbox.strategies.NetworkFirst({
				cacheName: 'geocoding-cache',
			})
		);

		workbox.routing.registerRoute(
			new RegExp('^https://api\\.open-meteo\\.com/v1/forecast'),
			new workbox.strategies.NetworkFirst({
				cacheName: 'weather-cache',
			})
		);

		workbox.routing.registerRoute(
			new RegExp('^https://dl\\.dropboxusercontent\\.com/s/'),
			new workbox.strategies.NetworkFirst({
				cacheName: 'dropbox-cache',
			})
		);

		// Add logging for debugging
		console.log('Workbox initialized and routes registered successfully');
	} else {
		console.warn(
			'Workbox is not available, service worker will run without caching'
		);
	}
} catch (error) {
	console.error('Error initializing Workbox:', error);
}

// Add service worker lifecycle event handlers with offline support
self.addEventListener('install', (event) => {
	console.log('Service Worker installing...');

	// Pre-cache core application assets
	event.waitUntil(
		caches.open('weathy-app-shell').then((cache) => {
			return cache.addAll(CORE_ASSETS);
		})
	);

	// Skip waiting to activate immediately
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	console.log('Service Worker activating...');

	// Claim clients immediately
	event.waitUntil(self.clients.claim());

	// Clean up old caches
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					// Delete old cache versions
					if (cacheName.startsWith('weathy-app')) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// Add fetch event listener with offline support
self.addEventListener('fetch', (event) => {
	// Handle core assets with cache-first strategy for offline support
	if (
		CORE_ASSETS.includes(event.request.url) ||
		CORE_ASSETS.includes(new URL(event.request.url).pathname)
	) {
		event.respondWith(
			caches.match(event.request).then((response) => {
				return response || fetch(event.request);
			})
		);
		return;
	}

	// Let Workbox handle API routes as before
	// For now, letting Workbox handle routing
});
