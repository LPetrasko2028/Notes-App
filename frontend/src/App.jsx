import FloatingShape from "./components/FloatingShape"
import LoadingSpinner from "./components/LoadingSpinner.jsx"
import { Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import VerifyEmail from "./pages/VerifyEmail"

import { Toaster } from 'react-hot-toast'

import { useAuthStore } from "./store/authStore.js"
import { useEffect } from "react"

// Protected route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  } else if (!user.isVerified) {
    return <Navigate to="/verify-email" />
  }
  return children
}

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  return isAuthenticated && user.isVerified ? <Navigate to="/dashboard" /> : children
}

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if (isCheckingAuth) {
    return <LoadingSpinner />
  }
  console.log(isCheckingAuth, isAuthenticated, user)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left='10%' delay={0} />
      <FloatingShape color="bg-green-500" size="w-48 h-48" top="20%" left='50%' delay={0} />
      <FloatingShape color="bg-green-500" size="w-32 h-32" top="60%" left='80%' delay={0} />

      <Routes>
        <Route path="/" element={
            <Home />
        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={
          <RedirectAuthenticatedUser>
            <ForgotPassword />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/reset-password/:token" element={
          <RedirectAuthenticatedUser>
            <ResetPassword />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
