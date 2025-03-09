// Load tasks from localStorage
export const loadTasks = () => {
    try {
      const tasks = localStorage.getItem("tasks")
      return tasks ? JSON.parse(tasks) : []
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error)
      return []
    }
  }
  
  // Save tasks to localStorage
  export const saveTasks = (tasks) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error)
    }
  }
  
  