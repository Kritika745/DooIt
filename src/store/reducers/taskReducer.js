import { createSlice } from "@reduxjs/toolkit"
import { loadTasks } from "../utils/localStorage"

const initialState = {
  tasks: loadTasks() || [],
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    updateTask: (state, action) => {
      const { id, text, priority, dueDate } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.text = text
        task.priority = priority
        task.dueDate = dueDate
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload)
      if (task) {
        task.important = !task.important
      }
    },
  },
})

export const { addTask, deleteTask, toggleTask, updateTask, toggleImportant } = taskSlice.actions
export default taskSlice.reducer