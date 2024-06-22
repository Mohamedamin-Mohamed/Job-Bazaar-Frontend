import userSlice from "./UserSlice";
import locationSlice from "./LocationSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";  //defaults to localStorage for web
const rootReducer = combineReducers({
    userInfo: userSlice,
    locationInfo: locationSlice
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware: (getDefaultMiddleware) =>{
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    }

})
const persistor = persistStore(Store)

export {Store, persistor}
