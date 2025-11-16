import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./NewTodo.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../api";
import { useNavigate } from "react-router";

function NewTodo() {
  const [todoData, setTodoData] = useState({
    todoItem: "",
    priority: "low",
    emoji: "🔎",
  });

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const navigate = useNavigate();

  const addTodo = async () => {
    if (!todoData.todoItem.trim()) {
      toast.error("Please enter a task!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todoData);

      if (response) {
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to add!!");
    }
  };

  return (
    <div className="new-todo-container">
      <div className="new-todo-form">
        <p className="heading">Create To Do</p>

        <input
          type="text"
          placeholder="Enter your task..."
          className="input-box"
          value={todoData.todoItem}
          onChange={(e) =>
            setTodoData({
              ...todoData,
              todoItem: e.target.value,
            })
          }
        />

        <select
          value={todoData.priority}
          className="select-box"
          onChange={(e) =>
            setTodoData({
              ...todoData,
              priority: e.target.value,
            })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <span
          className="emoji-box"
          onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
        >
          Emoji: {todoData.emoji}
        </span>

        <EmojiPicker
          onEmojiClick={({ emoji }) => {
            setTodoData({
              ...todoData,
              emoji: emoji,
            });
            setEmojiPickerOpen(false);
          }}
          open={emojiPickerOpen}
        />

        <div className="btn-group">
          <button onClick={addTodo} className="add-btn">
            Add Task
          </button>
         
        </div>
      </div>
        <button onClick={() => navigate("/")} className="back-btn">
            ⬅ Back
          </button>
      <Toaster />
    </div>

   
  );
}

export default NewTodo;
