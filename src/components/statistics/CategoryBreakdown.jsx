import React, { useContext, useMemo } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Tag, Clock } from 'lucide-react';

const CategoryBreakdown = () => {
  const { todos } = useContext(TodoContext);
  
  const categoryData = useMemo(() => {
    // Group todos by category
    const categories = todos.reduce((acc, todo) => {
      const category = todo.category;
      if (!acc[category]) {
        acc[category] = {
          name: category,
          total: 0,
          completed: 0,
          pending: 0,
          completionTime: []
        };
      }
      
      acc[category].total += 1;
      if (todo.completed) {
        acc[category].completed += 1;
        if (todo.completedAt && todo.createdAt) {
          const createdDate = new Date(todo.createdAt);
          const completedDate = new Date(todo.completedAt);
          const diffHours = Math.abs(completedDate - createdDate) / (1000 * 60 * 60);
          acc[category].completionTime.push(diffHours);
        }
      } else {
        acc[category].pending += 1;
      }
      
      return acc;
    }, {});
    
    // Calculate completion rate and average completion time
    Object.values(categories).forEach(category => {
      category.completionRate = category.total > 0 
        ? Math.round((category.completed / category.total) * 100) 
        : 0;
      
      category.avgCompletionTime = category.completionTime.length > 0
        ? (category.completionTime.reduce((sum, time) => sum + time, 0) / category.completionTime.length).toFixed(1)
        : 0;
    });
    
    return Object.values(categories);
  }, [todos]);

  // Colors for pie chart
  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
  
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-6">Category Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution by Category */}
        <div>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600">
              <Tag className="h-5 w-5" />
            </div>
            <h3 className="ml-2 text-base font-medium">Distribution by Category</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} todos`, props.payload.name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Completion Rate by Category */}
        <div>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="ml-2 text-base font-medium">Completion Rate by Category</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                <Bar dataKey="completionRate" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Category Completion Time */}
      <div className="mt-8">
        <h3 className="text-base font-medium mb-4">Average Completion Time by Category (hours)</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} hours`, 'Avg. Completion Time']} />
              <Bar dataKey="avgCompletionTime" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Tabular data */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time (hours)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categoryData.map((category, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.completed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.pending}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.completionRate}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.avgCompletionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryBreakdown;