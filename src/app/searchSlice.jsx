import { configureStore, createSlice } from '@reduxjs/toolkit'
import { server_url } from './constants'

const initialState = {
    data: null
  }

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    set_result: (state, action) => {
        state.data = action.payload     
    },
  },
})

export const { set_result } = SearchSlice.actions

export default SearchSlice.reducer