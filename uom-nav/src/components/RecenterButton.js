import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@mui/material';
import { IconHome } from '@tabler/icons-react';

import { UM_CENTER_COOR, ZOOM } from 'assets/constants';

const RecenterButton = ({ map }) => {
    const handleClick = useCallback(() => {
        map.flyTo(UM_CENTER_COOR, ZOOM);
    }, [map]);

    return (
        <Tooltip title="Re-Center">
            <IconButton variant="contained" color="primary" onClick={handleClick}>
                <IconHome />
            </IconButton>
        </Tooltip>
    );
};

RecenterButton.propTypes = {
    map: PropTypes.any
};

export default RecenterButton;
