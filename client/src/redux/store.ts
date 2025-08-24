import { configureStore } from "@reduxjs/toolkit";

import userBaseInfoReducer from "./userInfoState";

export const store = configureStore({
    reducer:{
        userBaseInfo: userBaseInfoReducer 
    }
});