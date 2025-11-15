"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { clearTokens, getAccessToken } from "../lib/auth"
import { useEffect, useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = getAccessToken()
    setLoggedIn(!!token)
  }, [])

  return (
    <nav className="w-full bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold">
        Task Manager
      </Link>

      {loggedIn ? (
        <div className="flex gap-4 items-center">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/tasks/create" className="hover:underline">
            Add Task
          </Link>

          <button
            onClick={() => {
              clearTokens()
              router.push("/")
            }}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </div>
      )}
    </nav>
  )
}
