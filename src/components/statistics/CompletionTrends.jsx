import React, { useContext, useMemo } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompletionTrends = () => {
  const { todos } = useContext(TodoContext);
  
  // Generate data for trends over time
  const completionTrends = useMemo(() => {
    // Only use completed todos
    const completedTodos = todos.filter(todo => todo.completed && todo.completedAt);
    
    // Sort by completion date
    completedTodos.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
    
    // Last 30 days trends
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Create a map of all dates in the last 30 days
    const dailyCompletions = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dailyCompletions[dateString] = { date: dateString, count: 0, cumulative: 0 };
    }
    
    // Fill in completion counts
    let cumulativeCount = 0;
    completedTodos.forEach(todo => {
      const completionDate = new Date(todo.completedAt).toISOString().split('T')[0];
      if (dailyCompletions[completionDate]) {
        dailyCompletions[completionDate].count += 1;
      }
    });
    
    // Calculate cumulative counts and format for display
    const sortedDates = Object.keys(dailyCompletions).sort();
    sortedDates.forEach(date => {
      if (sortedDates.indexOf(date) === 0) {
        dailyCompletions[date].cumulative = dailyCompletions[date].count;
      } else {
        const prevDate = sortedDates[sortedDates.indexOf(date) - 1];
        dailyCompletions[date].cumulative = dailyCompletions[prevDate].cumulative + dailyCompletions[date].count;
      }
      
      // Format date for display
      const dateObj = new Date(date);
      dailyCompletions[date].formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    return Object.values(dailyCompletions)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(item => ({
        date: item.formattedDate,
        daily: item.count,
        cumulative: item.cumulative
      }));
  }, [todos]);
  
  // Calculate velocity (average tasks completed per day over last 7 days)
  const velocity = useMemo(() => {
    if (completionTrends.length < 7) return 0;
    
    const last7Days = completionTrends.slice(-7);
    const totalCompleted = last7Days.reduce((sum, day) => sum + day.daily, 0);
    return (totalCompleted / 7).toFixed(1);
  }, [completionTrends]);
  
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-6">Completion Trends</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center mb-2">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h3 className="text-base font-medium">Task Completion Velocity</h3>
            <p className="text-sm text-gray-600">You complete an average of <span className="font-semibold text-blue-600">{velocity}</span> tasks per day (7-day average)</p>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={completionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value, index) => index % 5 === 0 ? value : ''}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="daily" 
                name="Daily Completed" 
                stroke="#3b82f6" 
                activeDot={{ r: 6 }}
                strokeWidth={2} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cumulative" 
                name="Cumulative Completed" 
                stroke="#8b5cf6" 
                activeDot={{ r: 6 }}
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          <p>This chart shows your daily completion count (blue) and cumulative completions (purple) over the last 30 days.</p>
          <p className="mt-1">Use this data to identify patterns in your productivity and set realistic goals.</p>
        </div>
      </div>
    </div>
  );
};

export default CompletionTrends;