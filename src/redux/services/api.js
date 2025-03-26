import axios from "axios";

console.log("API Base URL:", process.env.REACT_APP_API_URL); // Debugging line

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Uses environment variable
});

export const getPost = async () => {
  try {
    const response = await api.get("/products?limit=150"); // ✅ Correct API call
    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return error;
  }
};
