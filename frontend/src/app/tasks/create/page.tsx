"use client";

import AppLayout from "../../../components/AppLayout";
import { useState } from "react";
import { createTask } from "../../../lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getAccessToken } from "../../../lib/auth";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!getAccessToken()) {
    router.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTask({ title, description });
      toast.success("Task created");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto w-full text-white">
        <h1 className="text-2xl font-bold mb-4">Create New Task</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-neutral-700 bg-white text-black placeholder-gray-600 p-2 w-full rounded"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border border-neutral-700 bg-white text-black placeholder-gray-600 p-2 w-full rounded"
            placeholder="Description (optional)"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition"
            disabled={loading}
          >
            {loading ? "Creating Task..." : "Create Task"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
