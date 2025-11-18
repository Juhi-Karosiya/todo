import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://to-do-application-qnhv.onrender.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

const TODO_ITEMS = [
  {
    id: 1,
    todoItem: "Buy Groceries",
    priority: "high",
    emoji: "⚖️",
    isDone: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    todoItem: "Go To Gym",
    priority: "medium",
    emoji: "💪",
    isDone: true,
    createdAt: new Date().toISOString(),
  },
];

app.get("/todos", (req, res) => {
  res.json({
    success: true,
    data: TODO_ITEMS,
    message: "Todo items fetched successfully",
  });
});