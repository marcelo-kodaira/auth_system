import type { User } from "@/types/user"
import type { UserFormValues } from "@/lib/validations/user"

/**
 * USERS API SERVICE
 *
 * This service provides methods for interacting with user data.
 * It currently uses mock data, but can be easily switched to use real API endpoints.
 *
 * TO INTEGRATE WITH A REAL API:
 * 1. Import the apiClient from @/lib/api-client
 * 2. Replace the mock implementations with actual API calls
 * 3. Update error handling to match your API's error format
 */

// Mock data for development
export const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "manager" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "manager" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "user" },
  { id: "6", name: "Diana Prince", email: "diana@example.com", role: "admin" },
]

// API functions
export async function fetchUsers(): Promise<User[]> {
  try {
    // Mock implementation for development
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockUsers]), 500)
    })

    /* REAL API INTEGRATION:
    import { apiClient } from '@/lib/api-client'
    return apiClient.get('/users').then(response => response.data)
    */
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error instanceof Error ? error : new Error("Failed to fetch users")
  }
}

export async function fetchUser(id: string): Promise<User> {
  try {
    // Mock implementation for development
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

    /* REAL API INTEGRATION:
    import { apiClient } from '@/lib/api-client'
    return apiClient.get(`/users/${id}`).then(response => response.data)
    */
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)
    throw error instanceof Error ? error : new Error("Failed to fetch user")
  }
}

export async function createUser(userData: UserFormValues): Promise<User> {
  try {
    // Mock implementation for development
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

    /* REAL API INTEGRATION:
    import { apiClient } from '@/lib/api-client'
    return apiClient.post('/users', userData).then(response => response.data)
    */
  } catch (error) {
    console.error("Error creating user:", error)
    throw error instanceof Error ? error : new Error("Failed to create user")
  }
}

export async function updateUser(id: string, userData: Partial<UserFormValues>): Promise<User> {
  try {
    // Mock implementation for development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === id)
        if (index !== -1) {
          const updatedUser = { ...mockUsers[index], ...userData }
          mockUsers[index] = updatedUser
          resolve({ ...updatedUser })
        } else {
          reject(new Error("User not found"))
        }
      }, 500)
    })

    /* REAL API INTEGRATION:
    import { apiClient } from '@/lib/api-client'
    return apiClient.put(`/users/${id}`, userData).then(response => response.data)
    */
  } catch (error) {
    console.error(`Error updating user ${id}:`, error)
    throw error instanceof Error ? error : new Error("Failed to update user")
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    // Mock implementation for development
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

    /* REAL API INTEGRATION:
    import { apiClient } from '@/lib/api-client'
    return apiClient.delete(`/users/${id}`).then(() => {})
    */
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error)
    throw error instanceof Error ? error : new Error("Failed to delete user")
  }
}

