// React
import React, { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Leaflet
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMapEvent, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { divIcon, point } from 'leaflet';

// Material UI
import { Box, Stack } from '@mui/material';

// Components
import UtilityDrawer from 'components/UtilityDrawer';
import SelfLocatedButton from './components/SelfLocatedButton';
import RecenterButton from './components/RecenterButton';

// Resources
import { getShortestPath } from './app/resources/navigation';

// Assets
import utilities from './assets/utilities';
import { pinIcon } from 'assets/mapIcons';
import buildings from './assets/buildings';
import { UM_CENTER_COOR, ZOOM } from './assets/constants';
import './App.css';

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
    const currBuilding = useSelector((state) => state.building.building);
    const building = buildings.find((building) => building.value === currBuilding);

    // if (building && localStorage.getItem('currentLocation')) {
    //     const path = await getShortestPath(localStorage.getItem('currentLocation'), { lat: building.coords[0], lng: building.coords[1] });
    //     console.log(path);
    // }

    useEffect(() => {
        const getPath = async () => {
            if (building && localStorage.getItem('curLocationLat') && localStorage.getItem('curLocationLng')) {
                const path = await getShortestPath(
                    { lat: parseFloat(localStorage.getItem('curLocationLat')), lng: parseFloat(localStorage.getItem('curLocationLng')) },
                    {
                        lat: building.coords[0],
                        lng: building.coords[1]
                    }
                );
                console.log(path);
            }
        };

        getPath();
    }, [building, localStorage.getItem('currentLocation')]);

    const AddMarkerToClickLocation = () => {
        useMapEvents({
            click(e) {
                setMarkerPosition(e.latlng);
            }
        });

        return markerPosition === null ? null : <Marker position={markerPosition} icon={pinIcon} />;
    };

    const SetViewOnClick = () => {
        const map = useMapEvent('click', (e) => {
            map.setView(e.latlng, map.getZoom(), {
                animate: true
            });
        });
    };

    const displayUtilTypes = utilityList.map((checkedUtil) => utilities.find((util) => util.label === checkedUtil));
    const displayUtils = [];
    displayUtilTypes.forEach((utilType) =>
        utilType.locations.forEach((location) =>
            displayUtils.push({ coords: location.coords, image: location.image, icon: utilType.mapIcon })
        )
    );

    return (
        <>
            <MapContainer center={UM_CENTER_COOR} zoom={ZOOM} ref={setMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AddMarkerToClickLocation />
                {position === null ? null : <Marker position={position} icon={pinIcon} />}

                <SetViewOnClick />

                <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
                    {displayUtils.map((displayUtil, id) => {
                        return (
                            <Marker key={id} position={displayUtil.coords} icon={displayUtil.icon}>
                                <Popup>
                                    <img src={displayUtil.image} width="100" />
                                </Popup>
                            </Marker>
                        );
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
