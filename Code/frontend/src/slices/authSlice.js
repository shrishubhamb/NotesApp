import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: Boolean(localStorage.getItem('state')),
  },
  reducers: {
    signin: (state, action) => {
      localStorage.setItem('state', true)
      state.status = true
      localStorage.setItem('token', action.payload['token'])
      localStorage.setItem('username', action.payload['name'])
    },
    signout: (state, action) => {
      localStorage.setItem('state', false)
      state.status = false
      localStorage.clear()
    },
  },
})

export default authSlice.reducer
export const { signin, signout } = authSlice.actions
