"use client"

import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <AuthCard
      title="Login to your account"
      description="Enter your credentials to access your account"
      footer={
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-brand-purple hover:underline font-medium">
            Register
          </Link>
        </div>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}

