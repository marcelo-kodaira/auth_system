import { apiClient } from './api-client';

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Helper function to transform backend user to frontend format
const transformUser = (user: any): User => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
})

export async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get('/users');
  return response.data.map(transformUser);
}

export async function fetchUser(id: string): Promise<User> {
  const response = await apiClient.get(`/users/${id}`);
  return transformUser(response.data);
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt" | "isActive">): Promise<User> {
  const response = await apiClient.post('/users', userData);
  return transformUser(response.data);
}

export async function updateUser(id: string, userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>): Promise<User> {
  const response = await apiClient.put(`/users/${id}`, userData);
  return transformUser(response.data);
}

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/users/${id}`);
  return;
}

