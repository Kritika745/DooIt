"use client"

import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF6EF] py-12 px-4 sm:px-6 lg:px-8 auth-container">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
        <div className=" w-full flex items-center justify-center">
                  <img src="/logo.png" alt="" />
                </div>
          <h2 className="mt-6 text-center text-lg font-semibold text-gray-500">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>

        {isLogin ? <Login /> : <Register />}

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth

