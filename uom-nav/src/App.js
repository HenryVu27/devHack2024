import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useState } from 'react';

import { Icon, divIcon, point } from 'leaflet';

// create custom icon
const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    // iconUrl: require('./icons/placeholder.png'),
    iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: 'custom-marker-cluster',
        iconSize: point(33, 33, true)
    });
};

// markers
const markers = [
    {
        geocode: [48.86, 2.3522],
        popUp: 'Hello, I am pop up 1'
    },
    {
        geocode: [48.85, 2.3522],
        popUp: 'Hello, I am pop up 2'
    },
    {
        geocode: [49.8092, -97.13],
        popUp: 'Hello, I am pop up 3'
    }
];

export default function App() {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [position, setPosition] = useState(null);

    const SelfLocation = () => {
        const map = useMapEvents({
            contextmenu() {
                map.locate();
            },
            locationfound(e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
            }
        });

        return position === null ? null : <Marker position={position} icon={customIcon} />;
    };

    const AddMarkerToClickLocation = () => {
        const map = useMapEvents({
            click(e) {
                setMarkerPosition(e.latlng);
            }
        });

        return markerPosition === null ? null : <Marker position={markerPosition} icon={customIcon} />;
    };

    return (
        <MapContainer center={[49.8092, -97.13]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <AddMarkerToClickLocation />
            <SelfLocation />
            <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
                {/* Mapping through the markers */}
                {markers.map((marker, idx) => (
                    <Marker position={marker.geocode} icon={customIcon} key={idx}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
