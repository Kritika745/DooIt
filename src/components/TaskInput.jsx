"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/actions/taskActions"
import { Bell, Repeat, Calendar, Clock, X } from "lucide-react"

const TaskInput = () => {
  const dispatch = useDispatch()
  const [taskText, setTaskText] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [showDueDate, setShowDueDate] = useState(false)
  const [showReminder, setShowReminder] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)

  // New state for reminder and repeat options
  const [reminderDate, setReminderDate] = useState("")
  const [reminderTime, setReminderTime] = useState("")
  const [repeatOption, setRepeatOption] = useState("none")
  const [customRepeatValue, setCustomRepeatValue] = useState(1)
  const [customRepeatUnit, setCustomRepeatUnit] = useState("days")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskText.trim()) {
      dispatch(
        addTask({
          id: Date.now().toString(),
          text: taskText,
          important: false, // Initialize important property
          completed: false,
          priority,
          dueDate: dueDate || null,
          createdAt: new Date().toISOString(),
          // Add reminder and repeat data to the task
          reminder: showReminder && reminderDate && reminderTime ? { date: reminderDate, time: reminderTime } : null,
          repeat:
            showRepeat && repeatOption !== "none"
              ? {
                  option: repeatOption,
                  ...(repeatOption === "custom" && {
                    value: customRepeatValue,
                    unit: customRepeatUnit,
                  }),
                }
              : null,
        }),
      )
      // Reset all form fields
      setTaskText("")
      setPriority("medium")
      setDueDate("")
      setShowDueDate(false)
      setShowReminder(false)
      setShowRepeat(false)
      setReminderDate("")
      setReminderTime("")
      setRepeatOption("none")
      setCustomRepeatValue(1)
      setCustomRepeatUnit("days")
    }
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="bg-[#EEF6EF] rounded-lg p-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="w-full bg-transparent border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-sm"
          placeholder="Add A Task"
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {/* Reminder Button */}
            <button
              type="button"
              onClick={() => setShowReminder(!showReminder)}
              className={`p-2 rounded-md hover:bg-gray-100 ${showReminder ? "text-red-500" : "text-gray-500"}`}
            >
              <Bell size={18} />
            </button>

            {/* Repeat Button */}
            <button
              type="button"
              onClick={() => setShowRepeat(!showRepeat)}
              className={`p-2 rounded-md hover:bg-gray-100 ${showRepeat ? "text-blue-500" : "text-gray-500"}`}
            >
              <Repeat size={18} />
            </button>

            {/* Due Date Button */}
            <button
              type="button"
              onClick={() => setShowDueDate(!showDueDate)}
              className={`p-2 rounded-md hover:bg-gray-100 ${showDueDate ? "text-blue-500" : "text-gray-500"}`}
            >
              <Calendar size={18} />
            </button>

            {/* Priority Buttons */}
            <div className="flex items-center border-l border-gray-200 ml-2 pl-2">
              <span className="text-xs text-gray-500 mr-1">Priority:</span>
              <button
                type="button"
                onClick={() => setPriority("high")}
                className={`p-1.5 rounded-md text-xs font-medium ${
                  priority === "high" ? "bg-red-100 text-red-700" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                High
              </button>
              <button
                type="button"
                onClick={() => setPriority("medium")}
                className={`p-1.5 rounded-md text-xs font-medium ${
                  priority === "medium" ? "bg-yellow-100 text-yellow-700" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority("low")}
                className={`p-1.5 rounded-md text-xs font-medium ${
                  priority === "low" ? "bg-green-100 text-green-700" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Low
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!taskText.trim()}
            className="px-4 py-1.5 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ADD TASK
          </button>
        </div>

        {/* Additional options panels */}
        {showDueDate && (
          <div className="mt-3">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {showReminder && (
          <div className="mt-3 p-3 bg-white rounded-md shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Set Reminder</h3>
              <button
                type="button"
                onClick={() => setShowReminder(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="reminder-date" className="block text-xs text-gray-500 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="reminder-date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="reminder-time" className="block text-xs text-gray-500 mb-1">
                  Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={14} className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="reminder-time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="block w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500">You'll receive a notification at the specified time.</div>
          </div>
        )}

        {showRepeat && (
          <div className="mt-3 p-3 bg-white rounded-md shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Repeat Task</h3>
              <button type="button" onClick={() => setShowRepeat(false)} className="text-gray-400 hover:text-gray-500">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="repeat-none"
                  name="repeat"
                  value="none"
                  checked={repeatOption === "none"}
                  onChange={() => setRepeatOption("none")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="repeat-none" className="ml-2 text-sm text-gray-700">
                  Don't repeat
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="repeat-daily"
                  name="repeat"
                  value="daily"
                  checked={repeatOption === "daily"}
                  onChange={() => setRepeatOption("daily")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="repeat-daily" className="ml-2 text-sm text-gray-700">
                  Daily
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="repeat-weekly"
                  name="repeat"
                  value="weekly"
                  checked={repeatOption === "weekly"}
                  onChange={() => setRepeatOption("weekly")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="repeat-weekly" className="ml-2 text-sm text-gray-700">
                  Weekly
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="repeat-monthly"
                  name="repeat"
                  value="monthly"
                  checked={repeatOption === "monthly"}
                  onChange={() => setRepeatOption("monthly")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="repeat-monthly" className="ml-2 text-sm text-gray-700">
                  Monthly
                </label>
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="repeat-custom"
                    name="repeat"
                    value="custom"
                    checked={repeatOption === "custom"}
                    onChange={() => setRepeatOption("custom")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="repeat-custom" className="ml-2 text-sm text-gray-700">
                    Custom
                  </label>
                </div>

                {repeatOption === "custom" && (
                  <div className="ml-6 mt-2 flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={customRepeatValue}
                      onChange={(e) => setCustomRepeatValue(Number.parseInt(e.target.value) || 1)}
                      className="block w-16 px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select
                      value={customRepeatUnit}
                      onChange={(e) => setCustomRepeatUnit(e.target.value)}
                      className="block w-24 px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default TaskInput

