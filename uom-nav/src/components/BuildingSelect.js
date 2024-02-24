import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from 'react-select';
import buildings from 'assets/buildings';
import { setBuilding } from 'app/features/building/buildingSlice';

const BuildingSelect = () => {
    const currentBuilding = useSelector((state) => state.building.building);
    let dispatch = useDispatch();

    const handleChange = (event) => {
        let action;
        if (event) {
            action = setBuilding(event.value);
        } else {
            action = setBuilding('');
        }
        dispatch(action);
    };
    return (
        <Select
            onChange={handleChange}
            value={buildings.find((building) => building.value === currentBuilding)}
            placeholder="Choose a building..."
            classNamePrefix="select"
            isClearable
            isSearchable
            name="buildings"
            options={buildings}
        />
    );
};

export default BuildingSelect;
