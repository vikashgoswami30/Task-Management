"use client";

import AppLayout from "../../components/AppLayout";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../../lib/auth";
import { fetchTasks, deleteTask, toggleTask } from "../../lib/api";
import TaskCard from "../../components/TaskCard";
import toast from "react-hot-toast";
import Link from "next/link";

/** TASK TYPE */
export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: boolean;
}

/** QUERY TYPE */
interface TaskQuery {
  page?: number;
  take?: number;
  search?: string;
  status?: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const take = 10;

  /** FETCH TASKS */
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const query: TaskQuery = {
        page,
        take,
        search: search || undefined,
        status: status || undefined,
      };

      const res = await fetchTasks(query);
      const data: Task[] = res.data?.data || [];

      setTasks(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  /** CHECK AUTH + LOAD TASKS */
  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/");
      return;
    }
    loadTasks();
  }, [router, loadTasks]);

  /** MEMOIZED TASK LIST */
  const taskList = useMemo(
    () =>
      tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={async () => {
            try {
              await deleteTask(task.id);
              toast.success("Task deleted");
              loadTasks();
            } catch {
              toast.error("Failed to delete");
            }
          }}
          onToggle={async () => {
            try {
              await toggleTask(task.id, !task.status);
              toast.success("Updated");
              loadTasks();
            } catch {
              toast.error("Failed to update");
            }
          }}
        />
      )),
    [tasks, loadTasks]
  );

  return (
    <AppLayout>
      <div className="w-full max-w-3xl mx-auto text-white">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>

          <Link
            href="/tasks/create"
            className="bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded-md"
          >
            + Add Task
          </Link>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            className="p-2 rounded bg-white text-black flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 rounded bg-white text-black"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </select>

          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 text-white rounded"
            onClick={() => {
              setPage(1);
              loadTasks();
            }}
          >
            Apply
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && <p className="text-sm opacity-80 mb-4">Loading...</p>}

        {/* EMPTY STATE */}
        {!loading && tasks.length === 0 && (
          <p className="text-center opacity-60 py-10">No tasks found.</p>
        )}

        {/* TASKS */}
        <div className="flex flex-col gap-4">{taskList}</div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-600 opacity-50"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            ← Previous
          </button>

          <span className="opacity-80">Page {page}</span>

          <button
            disabled={tasks.length < take}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded ${
              tasks.length < take
                ? "bg-gray-600 opacity-50"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
