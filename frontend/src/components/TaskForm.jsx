import React, { useState, useEffect } from "react";
import { createTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ task, onSave, user, token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [labels, setLabels] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
      setPriority(task.priority);
      setLabels(task.labels ? task.labels.join(", ") : "");
    } else {
      resetForm();
    }
  }, [task]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
    setPriority("medium");
    setLabels("");
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status,
      dueDate: dueDate || undefined,
      priority,
      labels: labels.split(",").map((label) => label.trim()),
    };

    setLoading(true);

    try {
      await createTask(taskData);
      onSave();
      resetForm();
      setLoading(false);
      setSuccess("Task created successfully!");
      setTimeout(() => setSuccess(""), 3000);
      navigate("/tasks");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Failed to save task.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-8 max-w-xl mx-auto mt-8 transition-colors duration-200"
    >
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6 transition-colors duration-200">
        {task ? "Edit Task" : "Create New Task"}
      </h2>

      {success && <p className="alert alert-success">{success}</p>}
      {error && <p className="alert alert-error">{error}</p>}

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold dark:text-gray-300 transition-colors duration-200">Title</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter Task Title"
          className="input input-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold dark:text-gray-300 transition-colors duration-200">Description</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Enter Description"
          className="textarea textarea-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold dark:text-gray-300 transition-colors duration-200">Status</span>
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold dark:text-gray-300 transition-colors duration-200">Due Date</span>
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input input-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold dark:text-gray-300 transition-colors duration-200">Priority</span>
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="select select-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text font-semibold dark:text-gray-300 transition-colors duration-200">Labels (comma separated)</span>
        </label>
        <input
          type="text"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
          placeholder="Enter labels separated by commas"
          className="input input-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
        </button>
        {task && (
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-ghost text-red-500 dark:text-red-400 transition-colors duration-200"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
