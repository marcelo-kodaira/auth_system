export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

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

export interface AuthResponse {
  user: AuthUser
  token: string
}

