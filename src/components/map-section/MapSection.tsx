import React, { useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map-section.styles.css';
import customMarkerImage from '/public/icons/marker-icon.svg';

interface MapSectionProps {
  lat: number;
  lng: number;
}

export const MapSection: React.FC<MapSectionProps> = ({ lat, lng }) => {
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

      const customIcon = L.icon({
        iconUrl: customMarkerImage,
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        popupAnchor: [0, -64],
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
    <div className="map-section">
      <div className="map" ref={mapRef} />
    </div>
  );
};
