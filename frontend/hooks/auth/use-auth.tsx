"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { login as loginApi, logout as logoutApi, getCurrentUser, AUTH_TOKEN_KEY } from "@/services/auth/api"
import type { AuthUser } from "@/types/auth"

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  error: Error | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to authenticate"))
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loginApi({ email, password })
      setUser(response.user)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to login"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logoutApi()
      setUser(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to logout"))
    } finally {
      setIsLoading(false)
    }
  }

  const getToken = (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login: handleLogin,
        logout: handleLogout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

