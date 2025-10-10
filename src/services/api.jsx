import axios from "axios";

const DEFAULT_BASE_URL = "https://pwd-week5-ibunrooo.onrender.com"; // Render 주소

// Netlify 환경변수 우선
const envBaseUrl = import.meta.env?.VITE_API_BASE_URL;
const rawBaseUrl = envBaseUrl || DEFAULT_BASE_URL;

// 중복 슬래시 제거
const API_BASE_URL = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

console.log("API_BASE_URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log("📡 Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export const submissionAPI = {
  createSubmission: async (payload) => {
    const response = await api.post("/api/submissions", payload);
    return response.data;
  },
  listSubmissions: async (status) => {
    const response = await api.get("/api/submissions", { params: { status } });
    return response.data;
  },
  updateSubmission: async (id, payload) => {
    const response = await api.put(`/api/submissions/${id}`, payload);
    return response.data;
  },
  deleteSubmission: async (id) => {
    const response = await api.delete(`/api/submissions/${id}`);
    return response.status;
  },
};

export default api;
