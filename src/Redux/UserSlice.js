import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    loginShow: false,
    signupShow: false,
    loading: false,
    emailLookupShow: false,
    passwordResetShow: false,
    homeTileShow: true
}
const UserSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setEmail: (state, action) => ({
            ...state, email: action.payload
        }),
        setLoginShow: (state, action)=>({
            ...state, loginShow: action.payload
        }),

        setSignupShow : (state, action)=>({
            ...state, signupShow: action.payload
        }),
        setLoading : (state, action)=>({
            ...state, loading: action.payload
        }),
        setEmailLookupShow: (state, action) =>({
            ...state, emailLookupShow: action.payload
        }),
        setPasswordResetShow: (state, action) =>({
            ...state, passwordResetShow: action.payload
        }),
        setHomeTileShow: (state, action) =>({
            ...state, homeTileShow: action.payload
        })
    }
})
export default UserSlice.reducer
export const { setEmail, setLoading }  = UserSlice.actions

