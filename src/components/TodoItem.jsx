import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();
  
  return (
    <div className="flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 group">
      <button 
        className="mr-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
        onClick={() => toggleTodo(todo.id)}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed ? (
          <CheckCircle className="h-6 w-6 text-green-500" />
        ) : (
          <Circle className="h-6 w-6 text-gray-400" />
        )}
      </button>
      
      <div className="flex-1">
        <h3 className={`font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
          {todo.description}
        </p>
        <div className="mt-1 flex items-center">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {todo.category}
          </span>
          {todo.completed && todo.completedAt && (
            <span className="ml-2 text-xs text-gray-400">
              Completed on {new Date(todo.completedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      
      <button
        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1"
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete todo"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TodoItem;