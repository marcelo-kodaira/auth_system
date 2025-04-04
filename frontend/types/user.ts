export interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt?: string
  updatedAt?: string
}

export interface UserWithProfile extends User {
  profile?: {
    avatar?: string
    phone?: string
    address?: string
    company?: string
    position?: string
    bio?: string
  }
}

