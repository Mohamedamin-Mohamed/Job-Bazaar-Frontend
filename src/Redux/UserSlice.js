import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    loginShow: false,
    signupShow: false
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
        })
    }
})
export default UserSlice.reducer
export const { setEmail, setLoginShow, setSignupShow }  = UserSlice.actions

