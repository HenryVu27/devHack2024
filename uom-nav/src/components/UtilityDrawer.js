import * as React from 'react';

import { Box, Drawer, Button } from '@mui/material';

import CheckBoxes from './CheckBoxes';

export default function UtilityDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <CheckBoxes></CheckBoxes>
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
}
