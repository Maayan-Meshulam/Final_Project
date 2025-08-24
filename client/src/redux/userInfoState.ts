
//פרטי בסיס על המתשמש המחובר

import { createSlice } from "@reduxjs/toolkit"

    //ערך התחלתי
    const initialState: any = {
        id: null ,
        managerLevel: -1,
        connectedEmployess: []
    }    

    const userInfoSlice = createSlice({
        name: 'userBaseInfo',
        initialState,
        reducers:{
            setState: (action)=>{
                return action.payload
            },
            clearState: (currentState)=>{
                currentState = null
            }
        }
    });

    export default userInfoSlice.reducer;
    
    export const {setState, clearState} = userInfoSlice.actions
