import React, { useState } from 'react';

import { Box, Drawer, Button, Divider } from '@mui/material';

import CheckBoxes from './CheckBoxes';
import BuildingSelect from './BuildingSelect';

const UtilityDrawer = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250, m: 3 }} role="presentation">
            <BuildingSelect />
            <CheckBoxes />
        </Box>
    );

    return (
        <div>
            <Button variant="contained" onClick={toggleDrawer(true)}>
                Open drawer
            </Button>
            <Drawer open={open} anchor={'right'} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default UtilityDrawer;
