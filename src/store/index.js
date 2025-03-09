import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./reducers/taskReducer"
import authReducer from "./reducers/authReducer"
import weatherReducer from "./reducers/weatherReducer"

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
    weather: weatherReducer,
  },
  // Redux Toolkit's configureStore already includes thunk by default
  // No need to add it explicitly
})

