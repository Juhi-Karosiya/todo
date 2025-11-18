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

app.post("/todos", (req, res) => {
  const { todoItem, priority, emoji } = req.body;

  const todoObj = {
    id: TODO_ITEMS[TODO_ITEMS.length - 1].id + 1,
    todoItem: todoItem,
    priority: priority,
    emoji: emoji,
    isDone: false,
    createdAt: new Date().toISOString(),
  };

  TODO_ITEMS.push(todoObj);

  res.json({
    success: true,
    data: todoObj,
    message: "Todo item added successfully",
  });
});

app.get("/todos/search", (req, res) => {
  const { item, priority } = req.query;

  const filteredItems = TODO_ITEMS.filter((itemObj) => {
    if (
      itemObj.todoItem.toLowerCase().includes(item.toLowerCase()) &&
      itemObj.priority.toLowerCase() == priority.toLowerCase()
    ) {
      return true;
    }
    return false;
  });
  res.json({
    success: true,
    data: filteredItems,
    message: "Filtered todo items fetched successfully",
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  const todoItem = TODO_ITEMS.find((item) => {
    if (item.id == id) return item;
  });

  if (todoItem) {
    res.json({
      success: true,
      data: todoItem,
      message: "Todo item fetched successfully",
    });
  } else {
    res.json({
      success: false,
      message: "Todo item not found",
    });
  }
});