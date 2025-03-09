import { addTask, deleteTask, toggleTask, updateTask, toggleImportant } from "../reducers/taskReducer"
import { saveTasks } from "../utils/localStorage"

// These action creators are already created by the slice,
// but we're wrapping them to handle localStorage persistence

export const addTaskAndSave = (task) => (dispatch, getState) => {
  dispatch(addTask(task))
  const { tasks } = getState().tasks
  saveTasks(tasks)
}

export const deleteTaskAndSave = (id) => (dispatch, getState) => {
  dispatch(deleteTask(id))
  const { tasks } = getState().tasks
  saveTasks(tasks)
}

export const toggleTaskAndSave = (id) => (dispatch, getState) => {
  dispatch(toggleTask(id))
  const { tasks } = getState().tasks
  saveTasks(tasks)
}

export const updateTaskAndSave = (taskData) => (dispatch, getState) => {
  dispatch(updateTask(taskData))
  const { tasks } = getState().tasks
  saveTasks(tasks)
}

export const toggleImportantAndSave = (id) => (dispatch, getState) => {
  dispatch(toggleImportant(id))
  const { tasks } = getState().tasks
  saveTasks(tasks)
}

// For simplicity, we'll just export the original action creators
// and handle localStorage in the component
export { addTask, deleteTask, toggleTask, updateTask, toggleImportant }