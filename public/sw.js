importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

if (workbox) {
	workbox.routing.registerRoute(
		new RegExp('^https://nominatim.openstreetmap.org/reverse'),
		new workbox.strategies.NetworkFirst()
	);

	workbox.routing.registerRoute(
		new RegExp('^https://api.open-meteo.com/v1/forecast'),
		new workbox.strategies.NetworkFirst()
	);

	workbox.routing.registerRoute(
		new RegExp('^https://dl.dropboxusercontent.com/s/'),
		new workbox.strategies.NetworkFirst()
	);
} else {
	console.error("Workbox couldn't be loaded.");
}
