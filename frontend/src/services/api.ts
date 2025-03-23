import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies (if you're dealing with authentication)
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response, // Return the response as is if it's successful
  (error) => {
    // If no response is received, it's a network error or the server is down
    if (!error.response) {
      console.error("Network Error:", error.message); // Log the error message
      return Promise.reject(
        new Error("Network error. Please try again later.")
      );
    }

    // If error response is received, handle it
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    console.error("API Error:", message); // Log the error message

    // Return a more detailed error message
    return Promise.reject(new Error(message));
  }
);

export default api;
