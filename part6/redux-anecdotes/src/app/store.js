import { configureStore } from '@reduxjs/toolkit'

import anecdoteSlice from '../slices/anecdoteSlice'
import notificationSlice from '../slices/notificationSlice'
import filterSlice from '../slices/filter.slice'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    notifications: notificationSlice,
    filter: filterSlice,
  },
})

export default store
