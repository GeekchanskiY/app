import { configureStore, createSlice } from '@reduxjs/toolkit'
import { server_url } from './constants'

const initialState = {
    username: null,
    userimg: null,
    userid: null,
  }

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action) => {
        state.username = action.payload.username
        state.userid = action.payload.userid
        if (action.payload.img != server_url+"null"){
          state.userimg = action.payload.img
        } else {
          state.userimg = server_url + "/media/users/img.png"
        }
        
    },
  },
})

export const { set } = UserSlice.actions

export default UserSlice.reducer