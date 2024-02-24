import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    building: ''
};

export let buildingSlice = createSlice({
    name: 'building',
    initialState,
    reducers: {
        setBuilding: (state, action) => {
            state.building = action.payload;
            return state;
        }
    }
});

let { reducer, actions } = buildingSlice;
export let { setBuilding } = actions;
export default reducer;
