import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    city:'',
    states:'',
    country:'',
}

const LocationSlice = createSlice({
    name: 'locationInfo',
    initialState: initialState,
    reducers: {
        setLocationInfo: (state, action) => {
            const { city, states, country } = action.payload
            state.city = city
            state.states = states
            state.country = country
        }
    }
})
export default LocationSlice.reducer
export const { setLocationInfo } = LocationSlice.actions