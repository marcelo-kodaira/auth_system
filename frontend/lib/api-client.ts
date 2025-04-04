import axios from "axios"
import { AUTH_TOKEN_KEY } from "@/services/auth/api"



export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {

      if (error.response.status === 401) {
        localStorage.removeItem(AUTH_TOKEN_KEY)

        if (typeof window !== "undefined") {
          window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.href)}`
        }
      }

      if (error.response.status === 403) {
        console.error("Access denied:", error.response.data)
      }

      if (error.response.data && error.response.data.message) {
        return Promise.reject(new Error(error.response.data.message))
      }
    } else if (error.request) {
      console.error("Network error - no response received:", error.request)
      return Promise.reject(new Error("Network error - no response received"))
    }

    console.error("Request error:", error.message)
    return Promise.reject(error)
  },
)

