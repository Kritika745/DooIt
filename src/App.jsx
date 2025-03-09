"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { checkAuthStatus } from "./store/actions/authActions"
import Dashboard from "./components/Dashboard"
import Auth from "./components/Auth/Auth"

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <div className="min-h-screen">{isAuthenticated ? <Dashboard /> : <Auth />}</div>
}

export default App

