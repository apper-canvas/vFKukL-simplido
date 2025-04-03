import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

const TodoPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Task Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TodoList />
        </div>
        <div className="md:col-span-1">
          <TodoForm />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;