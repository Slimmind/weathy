import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map-section.styles.css';
import customMarkerImage from '/public/icons/marker-icon.svg';

export const MapSection = ({ coords }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;

    const loadMap = () => {
      map = L.map(mapRef.current).setView(coords, 12);

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
  }, [coords]);

  return (
    <div className="map-section">
      <div className="map" ref={mapRef} />
    </div>
  )
};
