import type { AuthUser, LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth"

// Mock auth functions for development
// In production, these would call actual API endpoints

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    // In production, use the API client
    // const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    // return response.data

    // Mock implementation for development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (credentials.email === "admin@example.com" && credentials.password === "password") {
          const user: AuthUser = {
            id: "1",
            name: "Admin User",
            email: credentials.email,
            role: "admin",
          }

          resolve({
            user,
            token: "mock-jwt-token",
          })
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 500)
    })
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to login")
  }
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  try {
    // In production, use the API client
    // const response = await apiClient.post<AuthResponse>('/auth/register', userData)
    // return response.data

    // Mock implementation for development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (userData.password !== userData.passwordConfirmation) {
          reject(new Error("Passwords do not match"))
          return
        }

        const user: AuthUser = {
          id: Math.random().toString(36).substring(2, 9),
          name: userData.name,
          email: userData.email,
          role: "user", // Default role for new registrations
        }

        resolve({
          user,
          token: "mock-jwt-token",
        })
      }, 500)
    })
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to register")
  }
}

export async function logout(): Promise<void> {
  try {
    // In production, use the API client
    // await apiClient.post('/auth/logout')

    // Mock implementation for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 300)
    })
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to logout")
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    // In production, use the API client
    // const response = await apiClient.get<AuthUser>('/auth/me')
    // return response.data

    // Mock implementation for development
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would check for a valid token in localStorage/cookies
        // and make an API request to validate and get the current user
        const hasToken = localStorage.getItem("auth-token")

        if (hasToken) {
          resolve({
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          })
        } else {
          resolve(null)
        }
      }, 300)
    })
  } catch (error) {
    console.error("Failed to get current user:", error)
    return null
  }
}

