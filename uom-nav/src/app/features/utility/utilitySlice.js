import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    utilityList: []
};

export let utilitySlice = createSlice({
    name: 'utility',
    initialState,
    reducers: {
        addUtility: (state, action) => {
            if (!state.utilityList.includes(action.payload)) {
                state.utilityList.push(action.payload);
            }
            return state;
        },
        removeUtility: (state, action) => {
            state.utilityList = state.utilityList.filter((utility) => utility !== action.payload);
            return state;
        }
    }
});

let { reducer, actions } = utilitySlice;
export let { addUtility, removeUtility } = actions;
export default reducer;
