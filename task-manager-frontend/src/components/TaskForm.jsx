import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/api";

const TaskForm = ({ selectedTask, refreshTasks, clearSelection }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        dueDate: selectedTask.dueDate?.split("T")[0],
      });
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        await updateTask(selectedTask._id, formData);
      } else {
        await createTask(formData);
      }
      setFormData({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });
      refreshTasks();
      clearSelection();
    } catch (err) {
      alert(err.response?.data?.message || "Task operation failed");
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
      />
      <button type="submit">
        {selectedTask ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
