import { configureStore } from '@reduxjs/toolkit'
import plantsReducer from '../features/plants/plantsSlice'

const store = configureStore({
  reducer: {
      plants: plantsReducer
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch