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
        },
        clearLocationInfo : (state) =>{
            state.city = ''
            state.states = ''
            state.country = ''
        }
    }
})
export default LocationSlice.reducer
export const { setLocationInfo, clearLocationInfo } = LocationSlice.actions