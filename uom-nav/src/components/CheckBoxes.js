import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import utilities from 'assets/utilities';
import { addUtility, removeUtility } from 'app/features/utility/utilitySlice';

const CheckBoxes = () => {
    const utilityList = useSelector((state) => state.utility.utilityList);
    let dispatch = useDispatch();

    const handleChange = (event, utilLabel) => {
        let action;
        if (event.target.checked) {
            action = addUtility(utilLabel);
        } else {
            action = removeUtility(utilLabel);
        }
        dispatch(action);
    };

    return (
        <FormGroup>
            {utilities.map((utility, idx) => (
                <FormControlLabel
                    control={
                        <>
                            <Checkbox checked={utilityList.includes(utility.label)} onChange={() => handleChange(event, utility.label)} />
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
