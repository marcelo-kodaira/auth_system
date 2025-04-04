
export const AppConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",

  auth: {
    tokenKey: "auth-token",
    userKey: "auth-user",

    mockUsers: [
      {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        password: "password",
        role: "admin",
      },
      {
        id: "2",
        name: "Manager User",
        email: "manager@example.com",
        password: "password",
        role: "manager",
      },
      {
        id: "3",
        name: "Regular User",
        email: "user@example.com",
        password: "password",
        role: "user",
      },
    ],

    loginRoute: "/login",
    registerRoute: "/register",
    defaultRedirectAfterLogin: "/",
  },

  mockApiDelay: 500,

  features: {
    enableMockApi: false,
  },
}

