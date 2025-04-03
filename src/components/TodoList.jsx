import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, getCompletedTodos, getActiveTodos } = useTodo();
  const [filter, setFilter] = useState('all');
  
  const filteredTodos = () => {
    switch (filter) {
      case 'active':
        return getActiveTodos();
      case 'completed':
        return getCompletedTodos();
      default:
        return todos;
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Tasks</h2>
        <div className="flex space-x-2">
          <button
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {filteredTodos().length > 0 ? (
          filteredTodos().map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No tasks found. {filter !== 'all' && <span>Try changing the filter or add a new task.</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;