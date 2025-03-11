"use client"
import { formatDistanceToNow } from "date-fns"
import { Star } from "lucide-react"

const TaskItem = ({ task, handleToggle, onTaskClick, darkMode, toggleImportant }) => {
  const priorityColors = {
    high: darkMode ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-800",
    medium: darkMode ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-100 text-yellow-800",
    low: darkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-800",
  }

  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1)

  const formattedDate = task.createdAt ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }) : ""

  const handleItemClick = (e) => {
    // Prevent click when clicking on checkbox or action buttons
    if (e.target.type === "checkbox" || e.target.closest("button")) {
      return
    }

    if (typeof onTaskClick === "function") {
      onTaskClick(task)
    } else {
      console.error("onTaskClick is not a function", onTaskClick)
    }
  }

  const handleStarClick = (e) => {
    e.stopPropagation()
    if (typeof toggleImportant === "function") {
      toggleImportant(task.id)
    }
  }

  return (
    <li
      className={`py-4 ${task.completed ? "opacity-60" : ""}  cursor-pointer`}
      onClick={handleItemClick}
    >
      <div className="pl-3 pr-1 py-1">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
              onClick={(e) => e.stopPropagation()}
            />
            <div>
              <p
                className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : darkMode ? "text-white" : "text-gray-900"}`}
              >
                {task.text}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
                >
                  {priorityLabel}
                </span>

                {task.dueDate && (
                  <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}

                {formattedDate && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">Added {formattedDate}</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleStarClick}
            className="p-1 rounded-full "
          >
            <Star
              size={20}
              className={darkMode ? "text-white" : "text-gray-800"}
              fill={task.important ? (darkMode ? "#FFFFFF" : "#000000") : "none"}
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TaskItem

