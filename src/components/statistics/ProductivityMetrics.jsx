import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Clock, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductivityMetrics = () => {
  const { todos } = useContext(TodoContext);
  
  // Get completed todos with timestamps
  const completedTodos = todos.filter(todo => todo.completed && todo.completedAt);

  // Time of day distribution (morning, afternoon, evening, night)
  const getTimeOfDay = (dateString) => {
    const hour = new Date(dateString).getHours();
    if (hour >= 5 && hour < 12) return 'Morning (5am-12pm)';
    if (hour >= 12 && hour < 17) return 'Afternoon (12pm-5pm)';
    if (hour >= 17 && hour < 21) return 'Evening (5pm-9pm)';
    return 'Night (9pm-5am)';
  };

  const timeOfDayDistribution = completedTodos.reduce((acc, todo) => {
    const timeOfDay = getTimeOfDay(todo.completedAt);
    acc[timeOfDay] = (acc[timeOfDay] || 0) + 1;
    return acc;
  }, {});

  const timeOfDayData = Object.entries(timeOfDayDistribution).map(([time, count]) => ({
    name: time,
    count: count
  }));

  // Calculate average completion time by day of week
  const dayOfWeekMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };

  const completionTimeByDay = completedTodos.reduce((acc, todo) => {
    const createdDate = new Date(todo.createdAt);
    const completedDate = new Date(todo.completedAt);
    const dayOfWeek = dayOfWeekMap[completedDate.getDay()];
    
    const diffTime = Math.abs(completedDate - createdDate);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (!acc[dayOfWeek]) {
      acc[dayOfWeek] = { total: diffHours, count: 1 };
    } else {
      acc[dayOfWeek].total += diffHours;
      acc[dayOfWeek].count += 1;
    }
    
    return acc;
  }, {});

  const avgCompletionTimeByDay = Object.entries(completionTimeByDay).map(([day, data]) => ({
    day,
    avgHours: data.total / data.count
  })).sort((a, b) => {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
  });

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-6">Productivity Patterns</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="ml-2 text-base font-medium">Time of Day Analysis</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            When you're most productive throughout the day
          </p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeOfDayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" name="Tasks Completed" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="ml-2 text-base font-medium">Time to Complete by Day</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Average time to complete tasks by day of week (in hours)
          </p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={avgCompletionTimeByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgHours" name="Avg. Hours to Complete" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {completedTodos.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          <p>No completed tasks data available.</p>
          <p className="mt-1 text-sm">Complete tasks to see productivity patterns.</p>
        </div>
      )}
    </div>
  );
};

export default ProductivityMetrics;