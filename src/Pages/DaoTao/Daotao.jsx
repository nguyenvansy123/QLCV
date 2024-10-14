import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Daotao = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskDescription.trim() !== "") {
      setError("");
    }
  }, [taskDescription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskDescription.trim() === "") {
      setError("Task description cannot be empty");
      return;
    }
    const newTask = {
      id: Date.now(),
      description: taskDescription,
      dueDate: dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskDescription("");
    setDueDate(null);
  };

  const handleComplete = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    if (completedTask) {
      completedTask.completed = true;
      setCompletedTasks([...completedTasks, completedTask]);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const clearCompletedTasks = () => {
    setCompletedTasks([]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task Manager
        </h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <input
              type="text"
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter task description"
              aria-label="Task Description"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select due date"
              aria-label="Due Date"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Task
          </button>
        </form>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Tasks</h2>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2"
              >
                <span className="text-gray-800">{task.description}</span>
                <div className="flex items-center">
                  {task.dueDate && (
                    <span className="text-sm text-gray-500 mr-2">
                      {task.dueDate.toLocaleDateString()}
                    </span>
                  )}
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="text-green-500 hover:text-green-600 focus:outline-none"
                    aria-label="Complete task"
                  >
                    <FaCheckCircle size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Completed Tasks
            </h2>
            <AnimatePresence>
              {completedTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center justify-between bg-gray-200 p-3 rounded-md mb-2"
                >
                  <span className="text-gray-600 line-through">
                    {task.description}
                  </span>
                  {task.dueDate && (
                    <span className="text-sm text-gray-500">
                      {task.dueDate.toLocaleDateString()}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              onClick={clearCompletedTasks}
              className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <FaTrash className="mr-2" /> Clear Completed Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
