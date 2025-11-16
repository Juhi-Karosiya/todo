const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080" 
    : "https://to-do-application-api.onrender.com"; 

export default API_BASE_URL;
