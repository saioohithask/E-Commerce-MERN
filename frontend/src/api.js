import axios from "axios";

// ✅ Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// ✅ Attach token automatically to every request
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Optional: Handle response errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired, please login again");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;