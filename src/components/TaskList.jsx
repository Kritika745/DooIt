"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteTask, toggleTask, updateTask } from "../store/actions/taskActions"
import TaskItem from "./TaskItem"

const TaskList = ({ darkMode, viewMode, searchQuery, onTaskClick , toggleImportant, filterType }) => {
  const dispatch = useDispatch()
  const { tasks } = useSelector((state) => state.tasks)
  const [filter, setFilter] = useState("all")
  const [editingTask, setEditingTask] = useState(null)
  const [editText, setEditText] = useState("")
  const [editPriority, setEditPriority] = useState("")
  const [editDueDate, setEditDueDate] = useState("")

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }

  const handleToggle = (id) => {
    dispatch(toggleTask(id))
  }

  const startEditing = (task) => {
    setEditingTask(task.id)
    setEditText(task.text)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate || "")
  }

  const saveEdit = () => {
    if (editText.trim()) {
      dispatch(
        updateTask({
          id: editingTask,
          text: editText,
          priority: editPriority,
          dueDate: editDueDate || null,
        }),
      )
      setEditingTask(null)
    }
  }

  const handleToggleImportant = (id) => {
    if (typeof toggleImportant === 'function') {
      toggleImportant(id);
    } else {
      console.warn('toggleImportant function not provided to TaskList');
    }
  };

  const cancelEdit = () => {
    setEditingTask(null)
  }

  // Filter tasks based on search query
  const searchedTasks = searchQuery
    ? tasks.filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : tasks

  const filteredTasks = searchedTasks.filter((task) => {
    // First apply the basic filter type
    switch (filterType) {
      case "all":
        return true; // Show all tasks
      case "important":
        return task.important === true;
      case "today":
        // Check if the task is due today
        if (!task.dueDate) return false;
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        return (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        );
      case "high":
      case "medium":
      case "low":
        return task.priority === filterType;
      default:
        return true;
    }
  });

  // Sort tasks by priority
  const sortByPriority = (tasks) => {
    return [...tasks].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  // Split tasks into incomplete and completed
  const incompleteTasks = sortByPriority(filteredTasks.filter((task) => !task.completed))
  const completedTasks = sortByPriority(filteredTasks.filter((task) => task.completed))

  return (
    <div className="border-t border-gray-300">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-12 w-12 mx-auto ${darkMode ? "text-gray-600" : "text-gray-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            No tasks found. Add a new task to get started!
          </p>
        </div>
      ) : (
        <div>
          {/* Incomplete Tasks Section */}
          {incompleteTasks.length > 0 && (
            <ul className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-300"} mb-6`}>
              {incompleteTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  editingTask={editingTask}
                  editText={editText}
                  editPriority={editPriority}
                  editDueDate={editDueDate}
                  setEditText={setEditText}
                  setEditPriority={setEditPriority}
                  setEditDueDate={setEditDueDate}
                  handleDelete={handleDelete}
                  handleToggle={handleToggle}
                  startEditing={startEditing}
                  saveEdit={saveEdit}
                  cancelEdit={cancelEdit}
                  onTaskClick={onTaskClick}
                  darkMode={darkMode}
                  toggleImportant={handleToggleImportant}
                />
              ))}
            </ul>
          )}

          {/* Completed Tasks Section */}
          {completedTasks.length > 0 && (
            <>
              <div className={`flex items-center py-2  border-b border-gray-300 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <span className="px-3 text-sm font-medium">Completed</span>
              </div>

              <ul className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-300"}`}>
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    editingTask={editingTask}
                    editText={editText}
                    editPriority={editPriority}
                    editDueDate={editDueDate}
                    setEditText={setEditText}
                    setEditPriority={setEditPriority}
                    setEditDueDate={setEditDueDate}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                    startEditing={startEditing}
                    saveEdit={saveEdit}
                    cancelEdit={cancelEdit}
                    onTaskClick={onTaskClick}
                    darkMode={darkMode}
                    toggleImportant={handleToggleImportant}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskList

