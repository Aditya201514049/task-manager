import React, { useState, useEffect, useCallback } from "react";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import dayjs from "dayjs";

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedLabels, setUpdatedLabels] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");

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

  const applyFilterSortAndSearch = useCallback((status, order, query, taskList) => {
    let filtered = status === "all" ? taskList : taskList.filter((task) => task.status === status);
    
    if (query.trim() !== "") {
      filtered = filtered.filter((task) => 
        task.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (order === "low-to-high") {
      filtered.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
    } else if (order === "high-to-low") {
      filtered.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
    }

    setFilteredTasks(filtered);
  }, []);

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

  useEffect(() => {
    applyFilterSortAndSearch(filterStatus, sortOrder, searchQuery, tasks);
  }, [filterStatus, sortOrder, searchQuery, tasks, applyFilterSortAndSearch]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
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
    document.getElementById("edit-task-modal").showModal();
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
      setEditingTask(null);
      document.getElementById("edit-task-modal").close();
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task. Please try again.");
    }
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "low-to-high" ? "high-to-low" : "low-to-high";
    setSortOrder(newOrder);
  };

  const handleViewClick = (task) => {
    setViewingTask(task);
  };

  const handleCloseView = () => {
    setViewingTask(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const closeModal = () => {
    setEditingTask(null);
    document.getElementById("edit-task-modal").close();
  };

  if (loading) return <p className="text-blue-500 dark:text-blue-400">Loading tasks...</p>;
  if (error) return <p className="text-red-500 dark:text-red-400">{error}</p>;

  return (
    <>
      <div className="bg-blue-50 dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-4xl mx-auto mt-10 transition-colors duration-200">
        <h2 className="text-3xl font-extrabold text-purple-800 dark:text-purple-400 mb-6 text-center transition-colors duration-200">Task List</h2>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks by title..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="select select-bordered bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200 w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={toggleSortOrder}
            className="btn btn-primary w-full sm:w-auto"
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
            <p className="text-center text-gray-500 dark:text-gray-400 py-4 transition-colors duration-200">
              {searchQuery.trim() !== "" 
                ? `No tasks found matching "${searchQuery}". Try a different search term.` 
                : "No tasks found. Try changing filters or add a new task."}
            </p>
          )}
        </ul>
      </div>

      {/* Edit Task Modal using DaisyUI dialog */}
      <dialog id="edit-task-modal" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 transition-colors duration-200">
          <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-4 transition-colors duration-200">Edit Task</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Title</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Description</label>
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
              rows="3"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Labels (comma separated)</label>
            <input
              type="text"
              value={updatedLabels}
              onChange={(e) => setUpdatedLabels(e.target.value)}
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Status</label>
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
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
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">Priority</label>
            <select
              value={updatedPriority}
              onChange={(e) => setUpdatedPriority(e.target.value)}
              className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="modal-action">
            <button
              onClick={closeModal}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default TaskList;
