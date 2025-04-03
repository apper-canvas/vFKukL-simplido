import { useContext } from 'react';
import { Trash2 } from 'lucide-react';
import { TodoContext } from '../context/TodoContext';

const categoryColors = {
  personal: 'bg-purple-100 text-purple-800',
  work: 'bg-blue-100 text-blue-800',
  study: 'bg-green-100 text-green-800',
  health: 'bg-red-100 text-red-800',
  other: 'bg-gray-100 text-gray-800'
};

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useContext(TodoContext);
  
  return (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
      />
      
      <div className="ml-3 flex-1">
        <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.title}
        </p>
        <div className="flex items-center mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[todo.category]}`}>
            {todo.category}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-600 hover:text-red-800 focus:outline-none"
        aria-label="Delete todo"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TodoItem;