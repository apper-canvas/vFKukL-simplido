import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTodo } from '../../context/TodoContext';

const TimelineChart = () => {
  const { getCompletionTimeline } = useTodo();
  
  // Format dates to be more readable
  const data = getCompletionTimeline().map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));
  
  return (
    <div className="card h-80">
      <h3 className="text-lg font-semibold mb-4">Tasks Completed (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            name="Completed Tasks" 
            stroke="#3B82F6" 
            activeDot={{ r: 8 }} 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;