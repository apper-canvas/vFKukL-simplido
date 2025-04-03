import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'

const MainFeature = () => {
  // Get tasks from localStorage or use empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('simplido-tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const inputRef = useRef(null)
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('simplido-tasks', JSON.stringify(tasks))
  }, [tasks])
  
  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim() === '') return
    
    const task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    setTasks([task, ...tasks])
    setNewTask('')
  }
  
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })
  
  const taskCountText = () => {
    const activeCount = tasks.filter(task => !task.completed).length
    if (tasks.length === 0) return "No tasks yet"
    return `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`
  }
  
  return (
    <div className="mb-16">
      <motion.div 
        className="card overflow-hidden mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={addTask} className="relative">
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-r from-primary-light/10 to-secondary-light/10 
                      dark:from-primary-dark/20 dark:to-secondary-dark/20 rounded-xl transition-opacity duration-300
                      ${isInputFocused ? 'opacity-100' : 'opacity-0'}`}
            layoutId="input-highlight"
          ></motion.div>
          
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Add a new task..."
              className="w-full py-4 pl-5 pr-16 bg-transparent border-none focus:outline-none text-lg"
            />
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="absolute right-3 p-2 rounded-full bg-primary text-white hover:bg-primary-dark 
                        transition-colors duration-200"
              disabled={newTask.trim() === ''}
              aria-label="Add task"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
      </motion.div>
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-surface-600 dark:text-surface-400 text-sm">
          {taskCountText()}
        </p>
        
        <div className="flex space-x-2 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg">
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-sm rounded-md capitalize transition-all duration-200
                        ${filter === filterType 
                          ? 'bg-white dark:bg-surface-700 shadow-sm font-medium' 
                          : 'text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'}`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div 
        layout
        className="space-y-3"
      >
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-12"
            >
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full 
                            bg-surface-100 dark:bg-surface-800 mb-4">
                <CheckCircle2 className="w-8 h-8 text-surface-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                {filter === 'all' 
                  ? "Your task list is empty" 
                  : `No ${filter} tasks`}
              </h3>
              <p className="text-surface-500 dark:text-surface-400">
                {filter === 'all' 
                  ? "Add a task to get started" 
                  : `Switch to a different filter to see tasks`}
              </p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className={`group flex items-start p-4 rounded-xl border 
                          ${task.completed 
                            ? 'bg-surface-50/50 dark:bg-surface-800/50 border-surface-200 dark:border-surface-700/50' 
                            : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 shadow-soft dark:shadow-none'}`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5
                            ${task.completed 
                              ? 'bg-primary border-primary text-white' 
                              : 'border-surface-300 dark:border-surface-600 group-hover:border-primary dark:group-hover:border-primary-light'}`}
                  aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {task.completed && <Check className="w-3.5 h-3.5" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`break-words ${task.completed ? 'line-through text-surface-400 dark:text-surface-500' : ''}`}>
                        {task.text}
                      </p>
                      <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">
                        {format(new Date(task.createdAt), 'MMM d, h:mm a')}
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteTask(task.id)}
                      className="ml-2 p-1.5 rounded-full text-surface-400 hover:text-red-500 
                                hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
      
      {tasks.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setTasks([])}
          className="mt-8 mx-auto block px-4 py-2 text-sm text-surface-500 hover:text-red-500 
                    bg-surface-100 dark:bg-surface-800 hover:bg-red-50 dark:hover:bg-red-900/20 
                    rounded-lg transition-colors duration-200"
        >
          Clear all tasks
        </motion.button>
      )}
    </div>
  )
}

export default MainFeature