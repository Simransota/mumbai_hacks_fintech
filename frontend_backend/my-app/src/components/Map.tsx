"use client";

import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import { FC } from "react";

interface MapProps {
  onChange: (location: [number, number]) => void;
}

const Map: FC<MapProps> = ({ onChange }) => {
  const position: [number, number] = [40, 0]; // Default position

  // Use useMapEvent to handle click events on the map
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    onChange([lat, lng]); // Call onChange with the selected coordinates
  });

  return (
    <MapContainer
      center={position}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default Map;
