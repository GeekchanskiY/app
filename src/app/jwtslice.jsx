import { configureStore, createSlice } from '@reduxjs/toolkit'
import { server_url } from './constants'

const initialState = {
    authentificated: false,
    token: null,
    refresh_token: null,
    expires_in: null
  }

  export const JWTSlice = createSlice({
    name: 'JWT',
    initialState,
    reducers: {
      refresh: (state, action) => {
          state.token = action.payload.token
          state.expires_in = action.payload.expires_in
      },
      auth: (state, action) => {
          state.authentificated = action.payload.authentificated
          state.token = action.payload.token
          state.refresh_token = action.payload.refresh
          state.expires_in = action.payload.expires_in
      },
      logout: (state) => {
          state.authentificated = false
          state.token = null
          state.refresh_token = null
          state.expires_in = null
      }
    },
  })
  
  export const { refresh, auth, logout } = JWTSlice.actions
  
  export default JWTSlice.reducer