import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  'filterQuery':''
}

const filterSlice = createSlice({
  name:'filter',
  initialState,
  reducers:{
    addFilterPhrase(state,action){
      state.filterQuery = action.payload
    }
  }
})

export default filterSlice.reducer
export const { addFilterPhrase } = filterSlice.actions