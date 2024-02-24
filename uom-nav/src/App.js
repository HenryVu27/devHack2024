import React, { useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import { useSelector } from 'react-redux';

import { Box, Stack } from '@mui/material';

import { center, zoom } from './assets/constants';
import { divIcon, point } from 'leaflet';
import SetViewOnClick from './components/SetViewOnClick';
import UtilityDrawer from 'components/UtilityDrawer';
import SelfLocatedButton from './components/SelfLocatedButton';
import RecenterButton from './components/RecenterButton';
import utilities from './assets/utilities';
import { pinIcon } from 'assets/mapIcons';

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: 'custom-marker-cluster',
        iconSize: point(33, 33, true)
    });
};

export default function App() {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [position, setPosition] = useState(null);
    const [map, setMap] = useState(null);
    const utilityList = useSelector((state) => state.utility.utilityList);

    const AddMarkerToClickLocation = () => {
        useMapEvents({
            click(e) {
                setMarkerPosition(e.latlng);
            }
        });

        return markerPosition === null ? null : <Marker position={markerPosition} icon={pinIcon} />;
    };

    const displayUtilTypes = utilityList.map((checkedUtil) => utilities.find((util) => util.label === checkedUtil));
    const displayUtils = [];
    displayUtilTypes.forEach((utilType) =>
        utilType.locations.forEach((location) => displayUtils.push({ location, icon: utilType.mapIcon }))
    );

    return (
        <>
            <MapContainer center={center} zoom={zoom} ref={setMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <AddMarkerToClickLocation />
                {position === null ? null : <Marker position={position} icon={pinIcon} />}

                <SetViewOnClick />

                <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
                    {/* Mapping through the markers */}
                    {displayUtils.map((displayUtil, id) => {
                        return <Marker key={id} position={displayUtil.location} icon={displayUtil.icon} />;
                    })}
                </MarkerClusterGroup>
            </MapContainer>
            <Box>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                    {map ? <SelfLocatedButton map={map} setPosition={setPosition} /> : null}
                    <UtilityDrawer />
                    {map ? <RecenterButton map={map} /> : null}
                </Stack>
            </Box>
        </>
    );
}
