import type { User, CreateUserRequest, UpdateUserRequest } from "./types"

// Mock data
const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "manager" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "manager" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "user" },
  { id: "6", name: "Diana Prince", email: "diana@example.com", role: "admin" },
]

// API functions
export async function fetchUsers(): Promise<User[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockUsers]), 500)
  })
}

export async function fetchUser(id: string): Promise<User> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === id)
      if (user) {
        resolve({ ...user })
      } else {
        reject(new Error("User not found"))
      }
    }, 500)
  })
}

export async function createUser(userData: CreateUserRequest): Promise<User> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        ...userData,
      }
      mockUsers.push(newUser)
      resolve({ ...newUser })
    }, 500)
  })
}

export async function updateUser(userData: UpdateUserRequest): Promise<User> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === userData.id)
      if (index !== -1) {
        const updatedUser = { ...mockUsers[index], ...userData }
        mockUsers[index] = updatedUser
        resolve({ ...updatedUser })
      } else {
        reject(new Error("User not found"))
      }
    }, 500)
  })
}

export async function deleteUser(id: string): Promise<void> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === id)
      if (index !== -1) {
        mockUsers.splice(index, 1)
        resolve()
      } else {
        reject(new Error("User not found"))
      }
    }, 500)
  })
}

