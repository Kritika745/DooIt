import {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutSuccess,
    authCheckComplete,
  } from "../reducers/authReducer"
  
  // Simulated authentication - in a real app, this would call an API
  export const login = (credentials) => (dispatch) => {
    dispatch(loginStart())
  
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any email with a password longer than 5 chars
      if (credentials.email && credentials.password.length >= 6) {
        const user = {
          id: "1",
          name: credentials.email.split("@")[0],
          email: credentials.email,
        }
  
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(user))
  
        dispatch(loginSuccess(user))
      } else {
        dispatch(loginFailure("Invalid credentials. Password must be at least 6 characters."))
      }
    }, 1000)
  }
  
  export const register = (userData) => (dispatch) => {
    dispatch(registerStart())
  
    // Simulate API call
    setTimeout(() => {
      if (userData.email && userData.password.length >= 6) {
        const user = {
          id: "1",
          name: userData.name || userData.email.split("@")[0],
          email: userData.email,
        }
  
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(user))
  
        dispatch(registerSuccess(user))
      } else {
        dispatch(registerFailure("Registration failed. Password must be at least 6 characters."))
      }
    }, 1000)
  }
  
  export const logout = () => (dispatch) => {
    // Remove from localStorage
    localStorage.removeItem("user")
  
    dispatch(logoutSuccess())
  }
  
  export const checkAuthStatus = () => (dispatch) => {
    const user = localStorage.getItem("user")
  
    if (user) {
      dispatch(loginSuccess(JSON.parse(user)))
    } else {
      dispatch(authCheckComplete())
    }
  }
  
  