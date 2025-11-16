"use client";

import AppLayout from "../../../../components/AppLayout";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAccessToken } from "../../../../lib/auth";
import { getTaskById, updateTask } from "../../../../lib/api";
import toast from "react-hot-toast";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();

  const taskId = Number(params.id); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load task on mount
  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/");
      return;
    }

    const loadTask = async () => {
      try {
        const res = await getTaskById(taskId);

        const task = res.data.data;

        setTitle(task.title);
        setDescription(task.description || "");
      } catch (err) {
        console.log(err);
        toast.error("Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateTask(taskId, { title, description });
      toast.success("Task updated");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <p className="p-6 text-white">Loading task...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto w-full text-white">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-neutral-700 bg-white text-black w-full p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />

          <textarea
            className="border border-neutral-700 bg-white text-black w-full p-2 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>

          <button
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
