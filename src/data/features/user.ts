import { createSlice } from '@reduxjs/toolkit'
import localforage from 'localforage'
import constants from '@/utils/constants'

export type UserInfo = object

export type UserSlice = {
  token: string | null
  userInfo: UserInfo | null
}

const userSlice = createSlice({
  name: 'user',
  initialState: {} as UserSlice,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload
      localforage.setItem(constants.LOCAL_USER_INFO, state.userInfo)
    },
    setToken(state, { payload }) {
      state.token = payload
      localforage.setItem(constants.LOCAL_TOKEN, state.token)
    },
    clear(state) {
      state.userInfo = null
      state.token = null
      localforage.removeItem(constants.LOCAL_USER_INFO)
      localforage.removeItem(constants.LOCAL_TOKEN)
    },
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
