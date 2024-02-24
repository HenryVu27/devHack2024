import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@mui/material';
import { IconCurrentLocation } from '@tabler/icons-react';

const SelfLocatedButton = ({ map, setPosition }) => {
    const handleClick = useCallback(() => {
        map.locate().on('locationfound', (e) => {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            localStorage.setItem('currentLocation', e.latlng);
        });
    }, [map]);

    return (
        <Tooltip title="Locate">
            <IconButton variant="contained" color="error" onClick={handleClick}>
                <IconCurrentLocation />
            </IconButton>
        </Tooltip>
    );
};

SelfLocatedButton.propTypes = {
    map: PropTypes.any,
    setPosition: PropTypes.func
};

export default SelfLocatedButton;
