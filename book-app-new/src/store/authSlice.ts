import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    accessToken: ''
}

export const authSlice = createSlice({name: 'auth', initialState, reducers:{
    login: (state, action) => {state.email= action.payload.email; state.accessToken = action.payload.accessToken},
    logout: (state) => {state.email = '', state.accessToken = ''}
}})


export const {login, logout} = authSlice.actions
export default authSlice.reducer