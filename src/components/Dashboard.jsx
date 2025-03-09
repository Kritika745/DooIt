"use client"

import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/actions/authActions"
import { updateTask, deleteTask } from "../store/actions/taskActions"
import { toggleImportantAndSave } from "../store/actions/taskActions"
import TaskInput from "./TaskInput"
import TaskList from "./TaskList"
// import WeatherWidget from "./WeatherWidget"
import { fetchWeather } from "../store/thunks/weatherThunk"
import { Menu, X, Search, Sun, Moon, InfoIcon, List, AlertTriangle, CheckCircle,AlertCircle, Grid, LogOut, ClipboardList, Calendar, Star, Map, Users, Plus, Bell , Repeat, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { tasks } = useSelector((state) => state.tasks)
  
  // State for UI controls
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchExpanded, setSearchExpanded] = useState(false)
 const [filterType, setFilterType] = useState("all") // "all", "important", "today", "high", "medium", "low"
 const [showDueDate, setShowDueDate] = useState(false)


  const searchRef = useRef(null)

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchExpanded && searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchExpanded])

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list')
  }

  const handleTaskClick = (task) => {
    console.log("Task clicked:", task) // Debug log
    setSelectedTask(task)
    setRightSidebarOpen(true)
  }

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id))
    setRightSidebarOpen(false)
    setSelectedTask(null)
  }

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask))
    setSelectedTask(updatedTask)
  }

  const toggleImportant = (taskId) => {
  dispatch(toggleImportantAndSave(taskId))
  
  // Update the selected task if it's the one being toggled
  if (selectedTask && selectedTask.id === taskId) {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setSelectedTask({
        ...selectedTask,
        important: !selectedTask.important,
      })
    }
  }
}

const handleFilterChange = (filter) => {
  setFilterType(filter)
}

  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = tasks.length - completedTasks




  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#232323] text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
  
  
  {/* left Sidebar */}
  <div className={`fixed overflow-y-auto hide-scrollbar top-18 bottom-0  left-0 z-50 w-60 ${darkMode ? 'bg-[#2C2C2C] text-[#E2E2E2]'  : 'bg-[#EEF6EF] text-[#1B281B]'} shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-400  ease-in-out `}>
   {/* User Profile Section */}
   <div className=" flex flex-col items-center pt-2 ">
          {/* Use email for profile picture */}
          {user?.email ? (
            <img
              src={`https://gravatar.com/avatar/${encodeURIComponent(user.email.trim().toLowerCase())}?d=identicon&s=128`}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          ) : (
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-08%20163826-7gQyV8w7GiVja8k2dy4AUEiuXwdeC6.png"
              alt="Profile"
              className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          )}

          {/* Use the name from registration, not email */}
          <h2 className="text-sm font-medium">Hey, {user?.name || "Guest"}</h2>
  <button 
    onClick={toggleSidebar}
    className={`absolute top-4 right-4 p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    <X size={20} />
  </button>
</div>

{/* Task Priority Navigation */}
<nav className={`  ml-4 mr-4 mt-1 mb-1 ${darkMode ? ' bg-[#232323]'  : ' bg-white'} text-sm`}>
  <ul className="pt-4 pb-4">
    <li>
      <a
        href="#"
        className={`flex items-center p-2 pl-4 rounded-md  ${filterType === "all" ? "bg-[#35793729] text-[#357937] " : ""} `}
        onClick={() => handleFilterChange("all")}
      >
        <ClipboardList size={20} className={` mr-3 ${darkMode ? ' text-[#E2E2E2]'  : ' text-[#1B281B]'} ${filterType === "all" ? " text-[#357937] " : ""}`} />
        All Tasks
      </a>
    </li>
    <li>
      <a
        href="#"
        className={`flex items-center p-2 pl-4 rounded-md ${filterType === "today" ? "bg-[#35793729] text-[#357937] " : ""} `}
        onClick={() => handleFilterChange("today")}
      >
        <Calendar size={20} className={` mr-3 ${darkMode ? ' text-[#E2E2E2]'  : ' text-[#1B281B]'} ${filterType === "today" ? " text-[#357937] " : ""}`} />
        Today
      </a>
    </li>
    <li>
      <a
        href="#"
        className={`flex items-center p-2 pl-4 rounded-md ${filterType === "important" ? "bg-[#35793729] text-[#357937] " : ""} `}
        onClick={() => handleFilterChange("important")}
      >
        <Star size={20} className={` mr-3 ${darkMode ? ' text-[#E2E2E2]'  : ' text-[#1B281B]'} ${filterType === "important" ? " text-[#357937] " : ""}`} />
        Important 
      </a>
    </li>
    <li>
      <a
        href="#"
        className={`flex items-center p-2 pl-4 rounded-md ${filterType === "high" ? "bg-[#35793729] text-[#357937] " : ""} `}
        onClick={() => handleFilterChange("high")}
      >
        <AlertTriangle size={20} className={` mr-3 ${darkMode ? ' text-[#E2E2E2]'  : ' text-[#1B281B]'} ${filterType === "high" ? " text-[#357937] " : ""}`}/>
        High Priority
      </a>
    </li>
    <li>
      <a
        href="#"
        className={`flex items-center p-2 pl-4 rounded-md ${filterType === "medium" ? "bg-[#35793729] text-[#357937] " : ""}  `}
        onClick={() => handleFilterChange("medium")}
      >
        <CheckCircle size={20} className={` mr-3 ${darkMode ? ' text-[#E2E2E2]'  : ' text-[#1B281B]'} ${filterType === "medium" ? " text-[#357937] " : ""}`} />
        Medium Priority
      </a>
    </li>
    <li> 
      <a
        href="#"
        className={`flex items-center p-2 pl-4 rounded-md ${filterType === "low" ? "bg-[#35793729] text-[#357937] " : ""} `}
        onClick={() => handleFilterChange("low")}
      >
        <AlertCircle size={20} className={` mr-3 ${darkMode ? ' text-[#E2E2E2]'  : ' text-[#1B281B]'} ${filterType === "low" ? " text-[#357937] " : ""}`} />
        Low Priority
      </a>
    </li>
  </ul>
  
  
</nav>

  <div className={`  m-4 pt-2 pb-4 ${darkMode ? ' bg-[#232323]'  : ' bg-white'} text-sm`}>
    {/* Add List Button */}
  <button
    className={`flex items-center w-full p-2 pl-4 mt-4 rounded-md ${darkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-700"}`}
  >
    <Plus size={20} className="mr-3" />
    Add list
  </button>
  </div>
  
 {/* Task Statistics */}
<div className="px-4 mt-4 mb-4">
  <div className={`p-4 ${darkMode ? ' bg-[#232323]'  : ' bg-white'} rounded-lg`}>
    <div className="flex items-center justify-between mb-1">
      <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Today Tasks </h3>
      <button className="text-gray-500 hover:text-gray-700">
      <InfoIcon size={20} />
      </button>
    </div>
    <p className="text-2xl font-bold mb-4">{tasks.length}</p>

    <hr className="border-b border-gray-300 mb-3" />
    
    {/* Circular Progress */}
    <div className="relative w-32 h-32 mx-auto">
  <svg className="w-full h-full" viewBox="0 0 50 50">
    {/* Background circle */}
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      className="stroke-current text-[#3F9142] "
      strokeWidth="10"
    />
    
    {/* Progress circle */}
    {tasks.length > 0 && (
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        className="stroke-current text-[#142E15]"
        strokeWidth="10"
        strokeDasharray="125.6"
        strokeDashoffset={`${125.6 - (completedTasks / tasks.length * 125.6)}`}
        strokeLinecap=""
        transform="rotate(-90 25 25)"
      />
    )}
  </svg>
  
  {/* Percentage text in the middle */}
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-lg font-medium">
      {tasks.length > 0 
        ? `${Math.round(completedTasks / tasks.length * 100)}%` 
        : '0%'}
    </span>
  </div>
</div>
    
    
    {/* Legend with actual counts */}
    <div className="flex justify-center gap-4 mt-4 text-sm">
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full bg-[#142E15] mr-1"></span>
        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Done
        </span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full bg-[#3F9142] dark:bg-[#3F9142] mr-1"></span>
        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Pending
        </span>
      </div>
    </div>
  </div>
</div>
  
  {/* Logout Button */}
  <div className=" w-full p-2 border-t border-gray-300 ">
    <button
      onClick={handleLogout}
      className="flex items-center justify-center w-full p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
    >
      <LogOut size={20} className="mr-3" />
      Logout
    </button>
  </div>
</div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}


{/* Right Sidebar */}
<div
  className={`fixed inset-y-0 top-18  right-0 z-50 w-80 ${
    darkMode ? "bg-[#2C2C2C]" : "bg-[#EEF6EF]"
  } shadow-lg transform ${
    rightSidebarOpen ? "translate-x-0" : "translate-x-full"
  } transition-transform duration-300 ease-in-out flex flex-col`}
>
  {selectedTask && (
    <>
      <div className="flex-1 flex flex-col">
        
        {/* Task Content */}
        <div className="flex-1  m-4 overflow-y-auto text-sm">
          {/* Task Title and Star */}
          <hr className= {` border-b  mt-4 mb-4 ${darkMode ? 'text-[#06ff1f15]' : 'text-gray-300'}`} />

          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={selectedTask.completed}
              onChange={() => handleToggle(selectedTask.id)}
              className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500"
              style={{ borderRadius: '0px' }} // Make checkbox square
            />
            <input
              type="text"
              value={selectedTask.text}
              onChange={(e) => {
                handleUpdateTask({
                  ...selectedTask,
                  text: e.target.value,
                })
              }}
              className={`flex-1 bg-transparent border-none text-lg font-medium focus:outline-none focus:ring-0 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            />
            <button
              onClick={() => toggleImportant(selectedTask.id)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Star
                size={20}
                className={darkMode ? "text-white" : "text-gray-800"}
                fill={selectedTask.important ? (darkMode ? "#FFFFFF" : "#000000") : "none"}
              />
            </button>
          </div>

          <hr className={` border-b  mt-4 mb-4 ${darkMode ? 'text-[#06ff1f15]' : 'text-gray-300'}`} />


          {/* Action Buttons */}
          <div className="space-y-1">
            <button
              className={`flex items-center w-full p-2 rounded-md ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Plus size={18} className="mr-3" />
              <span>Add Step</span>
            </button>

            <hr className={` border-b ${darkMode ? 'text-[#06ff1f15]' : 'text-gray-300'}`} />

            <button
              className={`flex items-center w-full p-2 rounded-md ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Bell size={18} className="mr-3" />
              <span>Set Reminder</span>
            </button>

            <hr className={` border-b  ${darkMode ? 'text-[#06ff1f15]' : 'text-gray-300'}`} />

            <button
              className={`flex items-center w-full p-2 rounded-md ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setShowDueDate(!showDueDate)}
            >
              <Calendar size={18} className="mr-3" />
              <span>
                {selectedTask.dueDate
                  ? new Date(selectedTask.dueDate).toLocaleDateString()
                  : "Add Due Date"}
              </span>
            </button>



            {showDueDate && (
              <div className="pl-9">
                <input
                  type="date"
                  value={selectedTask.dueDate || ""}
                  onChange={(e) => {
                    handleUpdateTask({
                      ...selectedTask,
                      dueDate: e.target.value,
                    })
                  }}
                  className={`w-full px-3 py-2 border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "border-gray-300"
                  } rounded-md text-sm`}
                />
              </div>
            )}

           <hr className={` border-b  ${darkMode ? 'text-[#06ff1f15]' : 'text-gray-300'}`} />

            <button
              className={`flex items-center w-full p-2 rounded-md ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Repeat size={18} className="mr-3" />
              <span>Repeat</span>
            </button>

            <hr className={` border-b  ${darkMode ? 'text-[#06ff1f15]' : 'text-gray-300'}`} />

            {/* Notes Section */}
            <div className="mt-4">
              <textarea
                placeholder="Add Notes"
                value={selectedTask.notes || ""}
                onChange={(e) => {
                  handleUpdateTask({
                    ...selectedTask,
                    notes: e.target.value,
                  })
                }}
                className={`w-full h-32 p-3  ${
                  darkMode
                    ? " text-white"
                    : " text-gray-900"
                }  text-sm resize-none `}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRightSidebarOpen(false)}
                className={`p-1 ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <X size={18} />
              </button>
              <span className="text-sm text-gray-500">
                Created {formatDistanceToNow(new Date(selectedTask.createdAt), { addSuffix: true })}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(selectedTask.id)}
              className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )}
</div>

      {/* Overlay for mobile */}
      {(sidebarOpen || rightSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => {
            setSidebarOpen(false)
            setRightSidebarOpen(false)
          }}
        ></div>
      )}





      {/* Main content */}
      <div  className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "md:ml-0" : ""} `}>
      <header className={`${darkMode ? "bg-[#242424] " : "bg-white "}  h-18 sticky top-0 z-40`}>
          <div className="w-full px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
            <div className="flex  flex-row justify-between w-full">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className={`p-2 rounded-md mr-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <Menu size={24} />
                </button>

                <div className="flex items-center">
                  <img src="/logo.png" alt="" />
                </div>
              </div>
              
              
             <div className="flex items-center space-x-4">
                {/* <WeatherWidget /> */}


                  {/* Expandable Search */}
              <div className="relative search-container flex items-center justify-center" ref={searchRef}>
                {!searchExpanded ? (
                  <button
                    onClick={() => setSearchExpanded(true)}
                    className="p-2"
                    aria-label="Search tasks"
                  >
                    <Search size={24}  />
                  </button>
                ) : (
                  <div className="flex items-center">
                    <div className="relative w-64 transition-all duration-300 ease-in-out">
                      <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={20} className="text-gray-800" />
                      </div>
                      <input
                        type="text"
                        className={`block w-full pl-10 pr-10 py-2 border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300"} rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent`}
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          setSearchExpanded(false)
                          setSearchQuery("")
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X size={16} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Search Results Dropdown */}
                {searchExpanded && searchQuery.trim() !== "" && (
                  <div
                    className={`absolute mt-1 w-full rounded-md shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} z-50`}
                  >
                    <div
                      className={`rounded-md ${darkMode ? "bg-gray-800 ring-gray-700" : "bg-white ring-gray-300"} ring-1 ring-opacity-5 overflow-hidden`}
                    >
                      <div className="py-1">
                        {tasks.filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase())).length >
                        0 ? (
                          tasks
                            .filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase()))
                            .slice(0, 5) // Limit to 5 results
                            .map((task) => (
                              <button
                                key={task.id}
                                className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-900"}`}
                                onClick={() => {
                                  handleTaskClick(task)
                                  setSearchExpanded(false)
                                  setSearchQuery("")
                                }}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-2 h-2 rounded-full mr-2 ${
                                      task.priority === "high"
                                        ? "bg-red-500"
                                        : task.priority === "medium"
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                    }`}
                                  ></div>
                                  <span className={`${task.completed ? "line-through opacity-60" : ""}`}>
                                    {task.text}
                                  </span>
                                </div>
                              </button>
                            ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
                
                <button
                  onClick={toggleViewMode}
                  className={`p-2 rounded-md items-center justify-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  title={viewMode === 'list' ? 'Switch to grid view' : 'Switch to list view'}
                >
                  {viewMode === 'list' ? <Grid size={24} /> : <List size={20} />}
                </button>
                
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-md items-center justify-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                
                
              </div>
            </div>
          </div>
        </header>

        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${sidebarOpen ? 'md:ml-64' : ''} ${rightSidebarOpen ? "md:mr-80" : ""} transition-all duration-300`}>

          <div className={`${darkMode ? 'bg-[#242424]' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
            <div className="p-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-[#242424]'} `}>My Tasks</h2>
              <hr className="border-gray-200 mb-6"/>
              <TaskInput darkMode={darkMode} />
              <TaskList
                darkMode={darkMode}
                viewMode={viewMode}
                searchQuery={searchQuery}
                onTaskClick={handleTaskClick}
                toggleImportant={toggleImportant}
                filterType={filterType}
              />
            </div>
          </div>
        </main>
      </div>

   
</div>

    
  )
}

export default Dashboard