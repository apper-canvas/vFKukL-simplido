import { createContext, useState, useEffect } from 'react';
import { sampleTodos } from '../data/sampleTodos';
import { calculateStreakMetrics } from '../utils/streakCalculator';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : sampleTodos;
  });

  const [streakStats, setStreakStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalCompletedTasks: 0,
    weeklyCompletion: 0,
    dailyActivity: {},
    completionByDay: {}
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    // Update streak metrics whenever todos change
    updateStreakMetrics();
  }, [todos]);

  const updateStreakMetrics = () => {
    const metrics = calculateStreakMetrics(todos);
    setStreakStats(metrics);
  };

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now().toString(),
      title: todo.title,
      category: todo.category,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const completed = !todo.completed;
        return {
          ...todo,
          completed,
          completedAt: completed ? new Date().toISOString() : null
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      addTodo, 
      toggleTodo, 
      deleteTodo,
      streakStats
    }}>
      {children}
    </TodoContext.Provider>
  );
};