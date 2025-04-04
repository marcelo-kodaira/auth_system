// Auth service types

// Base types
export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  token: string
}

// Request types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// Response types
export interface AuthResponse {
  user: AuthUser
  token: string
}

