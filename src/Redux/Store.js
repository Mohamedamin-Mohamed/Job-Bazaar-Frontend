import userSlice from "./UserSlice";
import {configureStore} from "@reduxjs/toolkit";

const Store = configureStore({
    reducer: {
        userInfo: userSlice
    }

})
export default Store
