import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@mui/material';
import { IconCurrentLocation } from '@tabler/icons-react';

function SelfLocatedButton({ map, setPosition }) {
    const handleClick = useCallback(() => {
        map.locate().on('locationfound', function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    }, [map]);

    return (
        <Tooltip title="Self Locate">
            <IconButton variant="contained" color="error" onClick={handleClick}>
                <IconCurrentLocation />
            </IconButton>
        </Tooltip>
    );
}

SelfLocatedButton.propTypes = {
    map: PropTypes.any,
    setPosition: PropTypes.func
};

export default SelfLocatedButton;
