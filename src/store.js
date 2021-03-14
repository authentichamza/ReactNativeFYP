import { createSlice, configureStore,creatAction } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux'

const tagsSlice = createSlice({
  name: 'tagsSelected',
  initialState: {
    value: []
  },
  reducers: {
    Delete: state => {
      state.value.splice(index, 1);
    },
    Add:{
      reducer:(state,action) => {
        state.value.concat([action.payload])
      }
    }
  }
})

const reducer = combineReducers({
  counter: tagsSlice.reducer,
  user: user.reducer,
})

export const store = createStore(reducer)