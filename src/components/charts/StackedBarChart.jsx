import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = ({ data, keys, colors, xAxisKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key, index) => (
          <Bar 
            key={key}
            dataKey={key} 
            stackId="a" 
            fill={colors[index % colors.length]} 
            name={key}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;