
//פרטי בסיס על המתשמש המחובר

import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

//ערך התחלתי
const initialState: any = {
    code: -1,
    user: null
}

const presistConfig = {
    key: "showCode",
    storage: sessionStorage    
}


const CodeSlice = createSlice({
    name: 'EnterCode',
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

const persistedReducer = persistReducer(presistConfig, CodeSlice.reducer);


// export default userInfoSlice.reducer;
export const presistReducerCode = persistedReducer;
export const { setState, clearState } = CodeSlice.actions
