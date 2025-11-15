"use client"

import { useState } from "react"
import { registerUser } from "../../lib/api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registerUser({ name, email, password })
      toast.success("Registered — please login")
      router.push("/")
    } catch (err) {
      toast.error((err as any)?.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 w-full text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  )
}
