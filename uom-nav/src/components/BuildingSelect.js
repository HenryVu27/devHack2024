import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import buildings from 'assets/buildings';
import { setBuilding } from 'app/features/building/buildingSlice';

const BuildingSelect = () => {
    const currentBuilding = useSelector((state) => state.building.building);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e ? dispatch(setBuilding(e.value)) : dispatch(setBuilding(''));
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
