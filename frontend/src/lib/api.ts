import api from "./axiosInstance"

export const registerUser = (data: any) => api.post("/auth/register", data)
export const loginUser = (data: any) => api.post("/auth/login", data)

export const fetchTasks = () => api.get("/tasks")
export const createTask = (data: any) => api.post("/tasks", data)
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`)
export const toggleTask = (id: number, status: boolean) =>
  api.patch(`/tasks/${id}/toggle`, { status })
