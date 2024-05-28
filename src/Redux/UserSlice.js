import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    loginShow: false,
    signupShow: false,
    loading: false
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
        })
    }
})
export default UserSlice.reducer
export const { setEmail, setLoginShow, setSignupShow, setLoading }  = UserSlice.actions

