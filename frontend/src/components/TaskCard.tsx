import Link from "next/link"
type Task = {
  id: number
  title: string
  description?: string | null
  status: boolean
}

export default function TaskCard({
  task,
  onDelete,
  onToggle,
}: {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number, status: boolean) => void
}) {
  return (
    
    <div className="border p-4 rounded flex justify-between items-start">
      <div className="max-w-[70%]">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}

        <label className="flex items-center gap-2 mt-3 text-sm">
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => onToggle(task.id, !task.status)}
          />
          <span>Completed</span>
        </label>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Link href={`/tasks/${task.id}/edit`} className="text-blue-600 underline">
          Edit
        </Link>

        <button onClick={() => onDelete(task.id)} className="text-red-600 underline">
          Delete
        </button>
      </div>
    </div>
  )
}
