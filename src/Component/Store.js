import { configureStore } from "@reduxjs/toolkit";
import ECOMMERCEAPI from "../Features/ECOMMERCEAPI";
import { setupListeners } from "@reduxjs/toolkit/query";

export const Store = configureStore({
    reducer: {
        [ECOMMERCEAPI.reducerPath] : ECOMMERCEAPI.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(ECOMMERCEAPI.middleware) 
})

setupListeners(Store.dispatch)