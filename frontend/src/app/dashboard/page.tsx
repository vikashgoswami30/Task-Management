"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { getAccessToken } from "../../lib/auth"
import { fetchTasks, deleteTask, toggleTask } from "../../lib/api"
import TaskCard from "../../components/TaskCard"
import toast from "react-hot-toast"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadTasks = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetchTasks()
      setTasks(res.data.data ?? [])
    } catch (err) {
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // client-only auth check
    if (!getAccessToken()) {
      router.replace("/")
      return
    }
    loadTasks()
  }, [router, loadTasks])

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
      toast.success("Task deleted")
      await loadTasks()
    } catch {
      toast.error("Delete failed")
    }
  }

  const handleToggle = async (id: number, status: boolean) => {
    try {
      await toggleTask(id, status)
      toast.success("Updated")
      await loadTasks()
    } catch {
      toast.error("Update failed")
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Link href="/tasks/create" className="bg-green-600 text-white py-2 px-4 rounded">
          + Add Task
        </Link>
      </div>

      {loading && <p className="text-sm mb-4">Loading...</p>}

      <div className="flex flex-col gap-4">
        {tasks.length === 0 && !loading && <p>No tasks yet.</p>}
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  )
}
