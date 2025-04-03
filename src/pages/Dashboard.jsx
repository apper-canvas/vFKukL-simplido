import { useTodo } from '../context/TodoContext';
import CompletionChart from '../components/charts/CompletionChart';
import TimelineChart from '../components/charts/TimelineChart';
import CategoryChart from '../components/charts/CategoryChart';
import { CheckCircle, Clock, Calendar, Award, Activity } from 'lucide-react';

const Dashboard = () => {
  const { todos, getCompletedTodos, getActiveTodos } = useTodo();
  
  const completedTodos = getCompletedTodos();
  const activeTodos = getActiveTodos();
  const completionRate = todos.length > 0 
    ? Math.round((completedTodos.length / todos.length) * 100) 
    : 0;
  
  const getRecentlyCompletedTodos = () => {
    return completedTodos
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, 5);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card border-t-blue-500">
          <div className="p-3 rounded-full bg-blue-100 mb-4">
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
          <span className="text-3xl font-bold">{completedTodos.length}</span>
          <span className="text-gray-500 mt-1">Completed Tasks</span>
        </div>
        
        <div className="stat-card border-t-yellow-500">
          <div className="p-3 rounded-full bg-yellow-100 mb-4">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <span className="text-3xl font-bold">{activeTodos.length}</span>
          <span className="text-gray-500 mt-1">Pending Tasks</span>
        </div>
        
        <div className="stat-card border-t-green-500">
          <div className="p-3 rounded-full bg-green-100 mb-4">
            <Activity className="h-8 w-8 text-green-600" />
          </div>
          <span className="text-3xl font-bold">{completionRate}%</span>
          <span className="text-gray-500 mt-1">Completion Rate</span>
        </div>
        
        <div className="stat-card border-t-purple-500">
          <div className="p-3 rounded-full bg-purple-100 mb-4">
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <span className="text-3xl font-bold">{todos.length}</span>
          <span className="text-gray-500 mt-1">Total Tasks</span>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CompletionChart />
        <TimelineChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CategoryChart />
        </div>
        
        <div className="lg:col-span-2">
          <div className="card h-80 overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Recently Completed</h3>
            {getRecentlyCompletedTodos().length > 0 ? (
              <div className="divide-y divide-gray-100">
                {getRecentlyCompletedTodos().map(todo => (
                  <div key={todo.id} className="py-3">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{todo.title}</p>
                        <div className="flex mt-1 items-center">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                            {todo.category}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {new Date(todo.completedAt).toLocaleDateString()} at {new Date(todo.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-4/5 text-gray-500">
                <Award className="h-12 w-12 mb-2 text-gray-400" />
                <p>No completed tasks yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;