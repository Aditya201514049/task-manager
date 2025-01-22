
import React, { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import dayjs from "dayjs";

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);  // New state for viewing task
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedLabels, setUpdatedLabels] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      } catch (error) {
        setError("Error fetching tasks. Please try again.");
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refresh]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      applyFilterAndSort(filterStatus, sortOrder, updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task. Please try again.");
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description || "");
    setUpdatedLabels(task.labels.join(", "));
    setUpdatedStatus(task.status);
    setUpdatedDueDate(task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD") : "");
    setUpdatedPriority(task.priority || "medium");
  };

  const handleSave = async () => {
    try {
      const updatedTask = {
        ...editingTask,
        title: updatedTitle,
        description: updatedDescription,
        labels: updatedLabels.split(",").map((label) => label.trim()),
        status: updatedStatus,
        dueDate: updatedDueDate ? dayjs(updatedDueDate).toISOString() : null,
        priority: updatedPriority,
      };

      await updateTask(editingTask._id, updatedTask);

      const updatedTasks = tasks.map((task) =>
        task._id === editingTask._id ? { ...task, ...updatedTask } : task
      );

      setTasks(updatedTasks);
      applyFilterAndSort(filterStatus, sortOrder, updatedTasks);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task. Please try again.");
    }
  };

  const applyFilterAndSort = (status, order, taskList) => {
    let filtered = status === "all" ? taskList : taskList.filter((task) => task.status === status);

    if (order === "low-to-high") {
      filtered.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
    } else if (order === "high-to-low") {
      filtered.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
    }

    setFilteredTasks(filtered);
  };

  const getPriorityValue = (priority) => {
    switch (priority) {
      case "low":
        return 1;
      case "medium":
        return 2;
      case "high":
        return 3;
      default:
        return 2;
    }
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    applyFilterAndSort(status, sortOrder, tasks);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "low-to-high" ? "high-to-low" : "low-to-high";
    setSortOrder(newOrder);
    applyFilterAndSort(filterStatus, newOrder, tasks);
  };

  const handleViewClick = (task) => {
    setViewingTask(task);
  };

  const handleCloseView = () => {
    setViewingTask(null);
  };

  if (loading) return <p className="text-blue-500">Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
   
    <div className="bg-blue-50 shadow-lg rounded-2xl p-6 max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-extrabold text-purple-800 mb-6 text-center">Task List</h2>

      {/* Filter and Sort */}
      <div className="mb-6 flex justify-between items-center">
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={toggleSortOrder}
          className="btn btn-primary"
        >
          Priority ({sortOrder === "low-to-high" ? "Low to High" : "High to Low"})
        </button>
      </div>

      <ul className="space-y-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li
              key={task._id}
              className="bg-white rounded-xl shadow-md p-4 border-l-8 transition-transform transform hover:scale-105 hover:shadow-lg border-purple-400"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {viewingTask && viewingTask._id === task._id ? (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {task.title}
                        <span
                          className={`ml-2 text-xs font-semibold py-1 px-2 rounded-full text-white ${task.status === "completed"
                              ? "bg-green-500"
                              : task.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                            }`}
                        >
                          {task.status}
                        </span>
                      </h3>
                      {task.dueDate && (
                        <p className="text-sm text-gray-600">
                          <strong>Due:</strong> {dayjs(task.dueDate).format("DD/MM/YYYY")}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        <strong>Priority:</strong> {task.priority || "Medium"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Description:</strong> {task.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Labels:</strong> {task.labels.join(", ")}
                      </p>
                      <button
                        onClick={handleCloseView}
                        className="btn btn-secondary mt-4"
                      >
                        Close
                      </button>
                    </div>
                  ) : editingTask && editingTask._id === task._id ? (
                    <div>
                      <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="input input-bordered w-full mb-2"
                        placeholder="Task Title"
                      />
                      <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        className="textarea textarea-bordered w-full mb-2"
                        rows="3"
                        placeholder="Task Description"
                      />
                      <input
                        type="text"
                        value={updatedLabels}
                        onChange={(e) => setUpdatedLabels(e.target.value)}
                        className="input input-bordered w-full mb-2"
                        placeholder="Labels (comma separated)"
                      />
                      <select
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                        className="select select-bordered w-full mb-2"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <select
                        value={updatedPriority}
                        onChange={(e) => setUpdatedPriority(e.target.value)}
                        className="select select-bordered w-full mb-2"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <input
                        type="date"
                        value={updatedDueDate}
                        onChange={(e) => setUpdatedDueDate(e.target.value)}
                        className="input input-bordered w-full mb-2"
                      />
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={handleSave}
                          className="btn btn-success"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {task.title}
                        <span
                          className={`ml-2 text-xs font-semibold py-1 px-2 rounded-full text-white ${task.status === "completed"
                              ? "bg-green-500"
                              : task.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                            }`}
                        >
                          {task.status}
                        </span>
                      </h3>
                      {task.dueDate && (
                        <p className="text-sm text-gray-600">
                          <strong>Due:</strong> {dayjs(task.dueDate).format("DD/MM/YYYY")}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        <strong>Priority:</strong> {task.priority || "Medium"}
                      </p>
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={() => handleViewClick(task)}
                          className="btn btn-info btn-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditClick(task)}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available for the selected filter.</p>
        )}
      </ul>
    </div>
  );
};


export default TaskList;
