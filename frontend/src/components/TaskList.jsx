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

  if (loading) return <p className="text-blue-500 dark:text-blue-400">Loading tasks...</p>;
  if (error) return <p className="text-red-500 dark:text-red-400">{error}</p>;

  return (
   
    <div className="bg-blue-50 dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-4xl mx-auto mt-10 transition-colors duration-200">
      <h2 className="text-3xl font-extrabold text-purple-800 dark:text-purple-400 mb-6 text-center transition-colors duration-200">Task List</h2>

      {/* Filter and Sort */}
      <div className="mb-6 flex justify-between items-center">
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="select select-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
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
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 border-l-8 transition-all transform hover:scale-105 hover:shadow-lg border-purple-400 dark:border-purple-500"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="flex-1">
                  {viewingTask && viewingTask._id === task._id ? (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-200">
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
                        <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                          <strong>Due:</strong> {dayjs(task.dueDate).format("DD/MM/YYYY")}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                        <strong>Priority:</strong> {task.priority || "Medium"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                        <strong>Description:</strong> {task.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full transition-colors duration-200">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">Edit Task</h3>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Title</label>
                          <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Description</label>
                          <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
                          ></textarea>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Labels (comma separated)</label>
                          <input
                            type="text"
                            value={updatedLabels}
                            onChange={(e) => setUpdatedLabels(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Status</label>
                          <select
                            value={updatedStatus}
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Due Date</label>
                          <input
                            type="date"
                            value={updatedDueDate}
                            onChange={(e) => setUpdatedDueDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Priority</label>
                          <select
                            value={updatedPriority}
                            onChange={(e) => setUpdatedPriority(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setEditingTask(null)}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-200">
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
                        <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                          <strong>Due:</strong> {dayjs(task.dueDate).format("DD/MM/YYYY")}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                        <strong>Priority:</strong> {task.priority || "Medium"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-3 md:mt-0">
                  {!viewingTask || viewingTask._id !== task._id ? (
                    <button
                      onClick={() => handleViewClick(task)}
                      className="btn btn-sm btn-info text-white w-full md:w-auto"
                    >
                      View
                    </button>
                  ) : (
                    <button
                      onClick={handleCloseView}
                      className="btn btn-sm btn-info text-white w-full md:w-auto"
                    >
                      Collapse
                    </button>
                  )}
                  <button
                    onClick={() => handleEditClick(task)}
                    className="btn btn-sm btn-success text-white w-full md:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm btn-error text-white w-full md:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4 transition-colors duration-200">No tasks found. Try changing filters or add a new task.</p>
        )}
      </ul>
    </div>
  );
};


export default TaskList;
