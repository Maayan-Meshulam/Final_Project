
//פרטי בסיס על המתשמש המחובר

import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

//ערך התחלתי
const initialState: any = {
    id: null,
    managerLevel: -1,
    connectedEmployess: [],
}

const presistConfig = {
    key: "uses",
    storage: sessionStorage    
}


const userInfoSlice = createSlice({
    name: 'userBaseInfo',
    initialState,
    reducers: {
        setState: (state, action) => {
            return action.payload
        },
        clearState: () => {
            return initialState
        }
    }
});

const persistedReducer = persistReducer(presistConfig, userInfoSlice.reducer);


// export default userInfoSlice.reducer;
export const presistReducer = persistedReducer;
export const { setState, clearState } = userInfoSlice.actions
