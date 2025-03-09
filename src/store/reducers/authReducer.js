import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false
      state.user = null
      state.loading = false
      state.error = action.payload
    },
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    registerFailure: (state, action) => {
      state.isAuthenticated = false
      state.user = null
      state.loading = false
      state.error = action.payload
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.loading = false
      state.error = null
    },
    authCheckComplete: (state) => {
      state.loading = false
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutSuccess,
  authCheckComplete,
} = authSlice.actions

export default authSlice.reducer

