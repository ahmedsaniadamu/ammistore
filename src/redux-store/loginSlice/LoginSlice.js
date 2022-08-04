import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name : 'login' ,
    initialState : {
        id : 0 ,
        username : '',
        email : '',
        isAuth : false ,      
    } ,
    reducers : {
        signUser : (state , { payload }) => {
            state.username = payload.name
            state.email = payload.email
            state.isAuth = true
            state.id = payload.id
        } ,
        logoutUser :  (state ) => {
              state.email = '' 
              state.username = ''
              state.isAuth = false
              state.id = 0
        }
    }
})

export const { signUser , logoutUser } = loginSlice.actions
export default loginSlice.reducer