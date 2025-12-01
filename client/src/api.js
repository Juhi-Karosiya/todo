const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? axios.get("http://localhost:8080/todos")
    : "https://todo-app-qfry.onrender.com"; 

export default API_BASE_URL;
