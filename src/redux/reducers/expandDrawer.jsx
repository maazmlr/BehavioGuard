import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const counterSlice = createSlice({
  name: 'expand',
  initialState,
  reducers: {
    changeStateTrue: (state) => {
      state.value = true
    },
    changeStateFalse: (state) => {
      state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeStateTrue, changeStateFalse } = counterSlice.actions

export default counterSlice.reducer
