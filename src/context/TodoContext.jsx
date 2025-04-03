import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

// Sample initial todos with categories
const initialTodos = [
  { id: 1, title: 'Complete React project', description: 'Finish the dashboard implementation', completed: true, category: 'Work', completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 2, title: 'Go grocery shopping', description: 'Buy fruits, vegetables, and milk', completed: true, category: 'Personal', completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 3, title: 'Exercise for 30 minutes', description: 'Go for a run or do home workout', completed: false, category: 'Health', completedAt: null },
  { id: 4, title: 'Read a book', description: 'Read at least 30 pages', completed: true, category: 'Personal', completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 5, title: 'Prepare presentation', description: 'Create slides for the meeting', completed: false, category: 'Work', completedAt: null },
  { id: 6, title: 'Call mom', description: 'Weekly call with family', completed: true, category: 'Family', completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 7, title: 'Clean the house', description: 'Vacuum and mop the floors', completed: false, category: 'Home', completedAt: null },
  { id: 8, title: 'Update resume', description: 'Add recent projects and skills', completed: true, category: 'Work', completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 9, title: 'Plan weekend trip', description: 'Research destinations and accommodations', completed: false, category: 'Travel', completedAt: null },
  { id: 10, title: 'Pay bills', description: 'Electricity, water, and internet bills', completed: true, category: 'Finance', completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
];

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = (newTodo) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        title: newTodo.title,
        description: newTodo.description,
        completed: false,
        category: newTodo.category || 'Uncategorized',
        completedAt: null
      }
    ]);
  };
  
  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : null 
            } 
          : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  const getCompletedTodos = () => {
    return todos.filter(todo => todo.completed);
  };
  
  const getActiveTodos = () => {
    return todos.filter(todo => !todo.completed);
  };
  
  const getTodosByCategory = () => {
    const categories = {};
    todos.forEach(todo => {
      if (!categories[todo.category]) {
        categories[todo.category] = { total: 0, completed: 0 };
      }
      categories[todo.category].total += 1;
      if (todo.completed) {
        categories[todo.category].completed += 1;
      }
    });
    return categories;
  };
  
  const getCompletionTimeline = () => {
    const completed = getCompletedTodos();
    const timeline = {};
    
    // Group by day for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      timeline[dateStr] = 0;
    }
    
    completed.forEach(todo => {
      if (todo.completedAt) {
        const dateStr = new Date(todo.completedAt).toISOString().split('T')[0];
        if (timeline[dateStr] !== undefined) {
          timeline[dateStr] += 1;
        }
      }
    });
    
    return Object.entries(timeline)
      .map(([date, count]) => ({ date, count }))
      .reverse();
  };
  
  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    getCompletedTodos,
    getActiveTodos,
    getTodosByCategory,
    getCompletionTimeline
  };
  
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};