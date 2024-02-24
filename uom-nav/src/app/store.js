import { configureStore } from '@reduxjs/toolkit';

import utilityReducer from './features/utility/utilitySlice';
import buildingReducer from './features/building/buildingSlice';

const store = configureStore({
    reducer: {
        utility: utilityReducer,
        building: buildingReducer
    }
});

export default store;
