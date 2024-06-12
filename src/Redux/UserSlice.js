import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    firstPanel: true,
    secondPanel: false,
    credentials: true,
    usrEmail: null,
    firstPanel2: false,
    secondPanel2: false
    }
    const UserSlice = createSlice({
        name: 'userInfo',
        initialState: initialState,
        reducers: {
            setLoading : (state, action)=>({
            ...state, loading: action.payload
        }),
            setFirstPanel: (state, action) =>({
            ...state, firstPanel: action.payload
            }),
            setSecondPanel: (state, action) =>({
            ...state, secondPanel: action.payload
        }),
            setCredentials: (state, action) =>({
            ...state, credentials: action.payload
        }),
            setUsrEmail: (state, action) =>({
                ...state, usrEmail: action.payload
            }),
            setFirstPanel2 : (state, action) =>({
                ...state, firstPanel2: action.payload
            }),
            setSecondPanel2: (state, action) =>({
                ...state, secondPanel2: action.payload
            })
    }
})
export default UserSlice.reducer
export const { setUsrEmail, setLoading, setFirstPanel, setSecondPanel, setSecondPanel2, setCredentials, setFirstPanel2 }  = UserSlice.actions

