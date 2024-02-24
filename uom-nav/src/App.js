import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import SetViewOnClick from './components/SetViewOnClick';

import { Icon } from 'leaflet';
import UtilityDrawer from 'components/UtilityDrawer';

// create custom icon
const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    // iconUrl: require('./icons/placeholder.png'),
    iconSize: [38, 38] // size of the icon
});

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
        useMapEvents({
            click(e) {
                setMarkerPosition(e.latlng);
            }
        });

        return markerPosition === null ? null : <Marker position={markerPosition} icon={customIcon} />;
    };

    return (
        <>
            <MapContainer center={[49.8092, -97.13]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AddMarkerToClickLocation />
                <SelfLocation />
                <SetViewOnClick />
            </MapContainer>
            <UtilityDrawer />
        </>
    );
}
