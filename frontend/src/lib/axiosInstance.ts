import axios from "axios"

const api = axios.create({
  baseURL: "https://task-managements-lrbc.onrender.com",
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
