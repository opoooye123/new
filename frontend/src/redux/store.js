import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch);
export default store;