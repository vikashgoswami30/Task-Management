"use client"

import { useState } from "react"
import { loginUser } from "../lib/api"
import { setTokens } from "../lib/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await loginUser({ email, password })
      setTokens(res.data.data.accessToken, res.data.data.refreshToken)
      toast.success("Login successful")
      router.push("/dashboard")
    } catch {
      toast.error("Invalid login")
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 w-full text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}
