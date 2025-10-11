import React, { useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map-section.styles.css';

interface MapSectionProps {
	lat: number;
	lng: number;
}

export const MapSection = ({ lat, lng }: MapSectionProps) => {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let map: L.Map;
		const coords: LatLngExpression = [lat, lng];

		const loadMap = () => {
			map = L.map(mapRef.current as HTMLDivElement, {
				dragging: false,
				scrollWheelZoom: false,
				doubleClickZoom: false,
				boxZoom: false,
				touchZoom: false,
				zoomControl: false,
			}).setView(coords, 12);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; OpenStreetMap contributors',
			}).addTo(map);

			// Use a fallback to a default marker icon for now
			// This avoids the SVG import issue while maintaining functionality
			const customIcon = L.icon({
				iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
			});

			L.marker(coords, { icon: customIcon }).addTo(map);
		};

		loadMap();

		return () => {
			if (map) {
				map.remove();
			}
		};
	}, [lat, lng]);

	return (
		<div className='map-section'>
			<div className='map' ref={mapRef} />
		</div>
	);
};
