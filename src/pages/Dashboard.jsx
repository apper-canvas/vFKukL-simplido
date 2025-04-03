import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import { CheckSquare, Clock, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { todos } = useContext(TodoContext);
  
  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);
  
  // Calculate completion rate
  const completionRate = todos.length > 0 
    ? Math.round((completedTodos.length / todos.length) * 100) 
    : 0;
  
  // Calculate category counts
  const categoryCounts = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-blue-50 border border-blue-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <CheckSquare className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-blue-600">Completed Todos</h3>
              <p className="mt-1 text-2xl font-semibold text-blue-800">{completedTodos.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-yellow-50 border border-yellow-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-yellow-600">Pending Todos</h3>
              <p className="mt-1 text-2xl font-semibold text-yellow-800">{pendingTodos.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-green-50 border border-green-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-green-600">Completion Rate</h3>
              <p className="mt-1 text-2xl font-semibold text-green-800">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Todo Status</h2>
          <div className="h-64">
            <PieChart 
              data={[
                { name: 'Completed', value: completedTodos.length, color: '#3b82f6' },
                { name: 'Pending', value: pendingTodos.length, color: '#f59e0b' }
              ]} 
            />
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Todos by Category</h2>
          <div className="h-64">
            <BarChart 
              data={Object.entries(categoryCounts).map(([category, count]) => ({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                value: count
              }))} 
            />
          </div>
        </div>
      </div>
      
      {/* Recent completed todos */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recently Completed Todos</h2>
        </div>
        
        <div className="border rounded-md">
          {completedTodos.length > 0 ? (
            completedTodos
              .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
              .slice(0, 5)
              .map(todo => (
                <div key={todo.id} className="flex items-center p-4 border-b border-gray-200 last:border-0">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
                      <CheckSquare className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-800">{todo.title}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {todo.category}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        Completed {new Date(todo.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No completed todos yet.</p>
              <p className="mt-1 text-sm">Complete some todos to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;