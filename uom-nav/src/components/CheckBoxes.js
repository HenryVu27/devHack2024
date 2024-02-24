import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import utilities from 'assets/utilities';

const CheckBoxes = () => {
    return (
        <FormGroup sx={{ m: 3 }}>
            {utilities.map((utility, idx) => (
                <FormControlLabel
                    control={
                        <>
                            <Checkbox />
                            {utility.icon}
                        </>
                    }
                    label={utility.label}
                    key={idx}
                />
            ))}
        </FormGroup>
    );
};

export default CheckBoxes;
