import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './features/user'
import { systemReducer } from './features/system'

export const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
  },
})
