// User service types

// Base types
export interface User {
  id: string
  name: string
  email: string
  role: string
}

// Request types
export interface CreateUserRequest {
  name: string
  email: string
  role: string
}

export interface UpdateUserRequest {
  id: string
  name: string
  email: string
  role: string
}

// Response types
export interface UserResponse {
  user: User
}

export interface UsersResponse {
  users: User[]
}

