import { useState, useContext } from 'react';
import { Plus } from 'lucide-react';
import { TodoContext } from '../context/TodoContext';

const TodoForm = () => {
  const { addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({
        title,
        category,
      });
      setTitle('');
      setCategory('personal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
          Todo Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          placeholder="Enter todo title"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary flex items-center">
        <Plus className="h-5 w-5 mr-1" />
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;