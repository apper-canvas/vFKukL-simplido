import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { Filter } from 'lucide-react';

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    const statusMatch = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const categoryMatch = 
      categoryFilter === 'all' || 
      todo.category === categoryFilter;
    
    return statusMatch && categoryMatch;
  });

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Todos</h2>
        
        <div className="flex flex-col sm:flex-row mt-3 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-1" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="border rounded-md">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No todos found.</p>
            {filter !== 'all' || categoryFilter !== 'all' ? (
              <p className="mt-1 text-sm">Try adjusting your filters.</p>
            ) : null}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        {todos.length} total todos • {todos.filter(t => t.completed).length} completed
      </div>
    </div>
  );
};

export default TodoList;