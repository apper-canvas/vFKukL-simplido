import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { PlusCircle } from 'lucide-react';

const categories = [
  'Work', 'Personal', 'Health', 'Family', 'Home', 
  'Finance', 'Education', 'Travel', 'Shopping', 'Other'
];

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTodo({
      title: title.trim(),
      description: description.trim(),
      category
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Personal');
  };
  
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="form-input resize-none"
            placeholder="Add details..."
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;