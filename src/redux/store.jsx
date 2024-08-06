import { configureStore } from '@reduxjs/toolkit'
import changeState from './reducers/expandDrawer'

export const store = configureStore({
  reducer: {
    expand: changeState,
  },
})