"use client"

import { useState } from "react"
import { createTask } from "../../../lib/api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { getAccessToken } from "../../../lib/auth"

export default function CreateTaskPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  // ensure client auth
  if (!getAccessToken()) {
    // during render we can't redirect; effect handles on mount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createTask({ title, description })
      toast.success("Task created")
      router.push("/dashboard")
    } catch (err) {
      toast.error("Create failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-600 text-white p-2 w-full rounded" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  )
}
