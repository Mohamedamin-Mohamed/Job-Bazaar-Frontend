import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    city: '',
    state: '',
    error: null
}

const LocationSlice = createSlice({
    name: 'locationInfo',
    initialState: initialState
    reducers: {
        setCity
    }
})