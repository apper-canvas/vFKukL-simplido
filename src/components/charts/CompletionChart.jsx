import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTodo } from '../../context/TodoContext';

const CompletionChart = () => {
  const { getCompletedTodos, getActiveTodos } = useTodo();
  
  const data = [
    { name: 'Todos Status', Completed: getCompletedTodos().length, Active: getActiveTodos().length }
  ];
  
  return (
    <div className="card h-80">
      <h3 className="text-lg font-semibold mb-4">Task Completion Status</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completed" fill="#10B981" barSize={40} />
          <Bar dataKey="Active" fill="#3B82F6" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletionChart;