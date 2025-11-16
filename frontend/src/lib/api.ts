import api from "./axiosInstance";

export const registerUser = (data: any) => api.post("/auth/register", data);
export const loginUser = (data: any) => api.post("/auth/login", data);

export const fetchTasks = (params: any = {}) =>
  api.get("/tasks", { params });

export const createTask = (data: any) => api.post("/tasks", data);
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);
export const toggleTask = (id: number, status: boolean) =>
  api.patch(`/tasks/${id}/toggle`, { status });

export const getTaskById = (id: number) => api.get(`/tasks/${id}`);
export const updateTask = (id: number, data: any) =>
  api.patch(`/tasks/${id}`, data);

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

