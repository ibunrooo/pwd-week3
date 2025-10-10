// src/services/api.jsx
import axios from "axios";

// ✅ Render 백엔드 주소
const DEFAULT_BASE_URL = "https://pwd-week5-ibunrooo.onrender.com";

// ✅ Netlify 환경변수 우선 적용
const envBaseUrl = import.meta.env?.VITE_API_BASE_URL;
const rawBaseUrl = envBaseUrl || DEFAULT_BASE_URL;

// ✅ 마지막에 슬래시가 있으면 제거
const API_BASE_URL = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

console.log("✅ API_BASE_URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// ✅ 요청 / 응답 로그용 인터셉터
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
    console.error("❌ API error:", error);
    return Promise.reject(error);
  }
);

// ✅ ✅ ✅ 여기 빠져있던 부분 복원
export const restaurantAPI = {
  getRestaurants: async () => {
    const response = await api.get("/api/restaurants");
    return response.data;
  },

  createRestaurant: async (payload) => {
    const response = await api.post("/api/restaurants", payload);
    return response.data;
  },

  updateRestaurant: async (id, payload) => {
    const response = await api.put(`/api/restaurants/${id}`, payload);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.status;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/api/restaurants/${id}`);
    return response.data;
  },

  getPopularRestaurants: async () => {
    const response = await api.get("/api/restaurants/popular");
    return response.data;
  },
};

// ✅ 제보 관련 API
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
