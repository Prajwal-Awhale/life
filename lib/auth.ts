"use client"

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

// Simple auth simulation - in production, use NextAuth.js or similar
export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation
    if (email === "demo@lifekey.com" && password === "demo123") {
      const user: User = {
        id: "user_" + Date.now(),
        email,
        name: "Demo User",
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem("lifekey_user", JSON.stringify(user))
      return user
    }

    // Check if user exists in localStorage (for demo)
    const existingUsers = JSON.parse(localStorage.getItem("lifekey_users") || "[]")
    const user = existingUsers.find((u: any) => u.email === email && u.password === password)

    if (user) {
      const authUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      }
      localStorage.setItem("lifekey_user", JSON.stringify(authUser))
      return authUser
    }

    throw new Error("Invalid email or password")
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("lifekey_users") || "[]")
    if (existingUsers.find((u: any) => u.email === email)) {
      throw new Error("User already exists with this email")
    }

    const user = {
      id: "user_" + Date.now(),
      email,
      name,
      password, // In production, this would be hashed
      createdAt: new Date().toISOString(),
    }

    existingUsers.push(user)
    localStorage.setItem("lifekey_users", JSON.stringify(existingUsers))

    const authUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }
    localStorage.setItem("lifekey_user", JSON.stringify(authUser))
    return authUser
  },

  logout: () => {
    localStorage.removeItem("lifekey_user")
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("lifekey_user")
    return user ? JSON.parse(user) : null
  },
}
