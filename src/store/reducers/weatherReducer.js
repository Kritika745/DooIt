import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  loading: false,
  error: null,
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchWeatherSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchWeatherFailure: (state, action) => {
      state.data = null
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } = weatherSlice.actions

export default weatherSlice.reducer

