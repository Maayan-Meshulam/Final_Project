import { configureStore } from "@reduxjs/toolkit";
import { presistReducer } from "./userInfoState";
import { presistReducerCode } from "./showEnterCode";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: {
        userBaseInfo: presistReducer,
        code: presistReducerCode,
    }
});

export const persistor = persistStore(store);