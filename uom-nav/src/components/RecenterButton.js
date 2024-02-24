import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@mui/material';
import { IconHome } from '@tabler/icons-react';

import { center, zoom } from 'assets/constants';

function RecenterButton({ map }) {
    const handleClick = useCallback(() => {
        map.flyTo(center, zoom);
    }, [map]);

    return (
        <Tooltip title="Re Center">
            <IconButton variant="contained" color="primary" onClick={handleClick}>
                <IconHome />
            </IconButton>
        </Tooltip>
    );
}

RecenterButton.propTypes = {
    map: PropTypes.any
};

export default RecenterButton;
