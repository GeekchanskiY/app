import { compose, configureStore } from '@reduxjs/toolkit'
import JWTReducer from './jwtslice'
import userReducer from './userslice'
import searchSlice from './searchSlice'

const authMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type == "JWT/auth"){
        localStorage.setItem('auth', JSON.stringify(action.payload))
    }
    
    return result;
  };

export default configureStore({
    reducer: {
        jwt: JWTReducer,
        user: userReducer,
        search: searchSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
  })