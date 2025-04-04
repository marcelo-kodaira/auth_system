import type { AuthUser, LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth"

import { apiClient } from "@/lib/api-client"

/**
 * AUTH SERVICES
 * Integration with the real backend API for authentication.
 */

// Auth token storage key
export const AUTH_TOKEN_KEY = "auth-token"
export const AUTH_USER_KEY = "auth-user"

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    const data = response.data;

    // Create auth user from response
    const authUser: AuthUser = {
      id: data.user.id,
      name: `${data.user.firstName} ${data.user.lastName}`,
      email: data.user.email,
      role: 'user', // Default role as we don't have roles in our backend yet
    }

    // Store token and user in localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, data.access_token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser))

    return {
      user: authUser,
      token: data.access_token,
    }
  } catch (error: any) {
    console.error('Login failed:', error)
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  try {
    // Validate passwords match
    if (userData.password !== userData.passwordConfirmation) {
      throw new Error("Passwords do not match")
    }

    // Extract first name and last name from the full name
    const nameParts = userData.name.split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

    // Create user in the backend
    const response = await apiClient.post('/users', {
      firstName,
      lastName,
      email: userData.email,
      password: userData.password
    })

    // After user creation, perform login
    return await login({
      email: userData.email,
      password: userData.password
    })
  } catch (error: any) {
    console.error('Registration failed:', error)
    throw new Error(error.response?.data?.message || 'Registration failed')
  }
}

export async function logout(): Promise<void> {
  try {
    // In a real implementation with session invalidation on the server:
    // await apiClient.post('/auth/logout')
    
    // Clean up local storage
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
  } catch (error: any) {
    console.error('Logout error:', error)
    // Still remove the tokens even if the API call fails
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) {
      return null
    }
    
    // Try to get cached user first
    const userJson = localStorage.getItem(AUTH_USER_KEY)
    if (userJson) {
      try {
        return JSON.parse(userJson) as AuthUser
      } catch (e) {
        console.warn('Failed to parse cached user')
      }
    }

    // If no cached user or parsing failed, validate the token with the backend
    try {
      // This would typically be a call to get the current user profile
      // For now, we'll use the token to get a list of users as a validation
      await apiClient.get('/users')
      
      // If we make it here, the token is valid but we don't have user data
      // In a real implementation, we would have an endpoint to get the current user
      // and would set the user data in localStorage
      
      return null
    } catch (error: any) {
      // If the API call fails with 401, clear the token
      if (error.response?.status === 401) {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_USER_KEY)
      }
      return null
    }
  } catch (error: any) {
    console.error('Error getting current user:', error)
    return null
  }
}

