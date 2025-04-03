import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useTodo } from '../../context/TodoContext';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#D97706', '#0891B2', '#4B5563'];

const CategoryChart = () => {
  const { getTodosByCategory } = useTodo();
  
  const categoryData = getTodosByCategory();
  const data = Object.entries(categoryData).map(([name, stats]) => ({
    name,
    value: stats.completed,
    total: stats.total
  }));
  
  return (
    <div className="card h-80">
      <h3 className="text-lg font-semibold mb-4">Completed Tasks by Category</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} completed`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;