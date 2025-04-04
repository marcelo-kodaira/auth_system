"use client"

import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Enter your details to create a new account"
      footer={
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-purple hover:underline font-medium">
            Login
          </Link>
        </div>
      }
    >
      <RegisterForm />
    </AuthCard>
  )
}

