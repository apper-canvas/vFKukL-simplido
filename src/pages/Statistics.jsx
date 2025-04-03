import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { BarChart2, Clock, Calendar, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import TimelineChart from '../components/charts/TimelineChart';
import CompletionChart from '../components/charts/CompletionChart';
import CategoryBreakdown from '../components/statistics/CategoryBreakdown';
import ProductivityMetrics from '../components/statistics/ProductivityMetrics';
import CompletionTrends from '../components/statistics/CompletionTrends';
import StatisticsCard from '../components/statistics/StatisticsCard';

const Statistics = () => {
  const { todos, streakStats } = useContext(TodoContext);
  
  // Count todos by category
  const categoryCounts = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {});
  
  // Count todos by completion status
  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);
  
  // Calculate average completion time (in days) for completed todos
  const avgCompletionTime = completedTodos.length > 0 
    ? completedTodos.reduce((total, todo) => {
        const createdDate = new Date(todo.createdAt);
        const completedDate = new Date(todo.completedAt);
        const diffTime = Math.abs(completedDate - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return total + diffDays;
      }, 0) / completedTodos.length
    : 0;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Detailed Statistics</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticsCard
          icon={<BarChart2 />}
          title="Task Completion Rate"
          value={`${todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0}%`}
          description="Overall completion rate"
          color="blue"
        />
        
        <StatisticsCard
          icon={<Clock />}
          title="Avg. Completion Time"
          value={`${avgCompletionTime.toFixed(1)} days`}
          description="Average time to complete tasks"
          color="green"
        />
        
        <StatisticsCard
          icon={<Calendar />}
          title="Most Productive Day"
          value={Object.entries(streakStats.completionByDay)
            .sort(([, a], [, b]) => b - a)[0][0]}
          description="Day with most completed tasks"
          color="purple"
        />
        
        <StatisticsCard
          icon={<TrendingUp />}
          title="Completion Streak"
          value={`${streakStats.currentStreak} days`}
          description={`Longest: ${streakStats.longestStreak} days`}
          color="indigo"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card h-80">
          <h2 className="text-lg font-semibold mb-4">Task Status Distribution</h2>
          <PieChart 
            data={[
              { name: 'Completed', value: completedTodos.length, color: '#4ade80' },
              { name: 'Pending', value: pendingTodos.length, color: '#fb923c' }
            ]} 
          />
        </div>
        
        <div className="card h-80">
          <h2 className="text-lg font-semibold mb-4">Tasks By Category</h2>
          <BarChart 
            data={Object.entries(categoryCounts).map(([category, count]) => ({
              name: category.charAt(0).toUpperCase() + category.slice(1),
              value: count
            }))} 
          />
        </div>
      </div>
      
      {/* Detailed Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimelineChart />
        <CompletionChart />
      </div>
      
      {/* Detailed Analysis Components */}
      <div className="space-y-6">
        <ProductivityMetrics />
        <CategoryBreakdown />
        <CompletionTrends />
      </div>
    </div>
  );
};

export default Statistics;