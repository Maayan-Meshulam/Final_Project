import { configureStore } from "@reduxjs/toolkit";
import { presistReducer } from "./userInfoState";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: {
        userBaseInfo: presistReducer,
    }
});

export const persistor = persistStore(store);