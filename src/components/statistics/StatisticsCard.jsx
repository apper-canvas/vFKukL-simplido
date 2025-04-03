import React from 'react';

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-blue-600',
    value: 'text-blue-800'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-100',
    icon: 'bg-green-100 text-green-600',
    title: 'text-green-600',
    value: 'text-green-800'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    icon: 'bg-purple-100 text-purple-600',
    title: 'text-purple-600',
    value: 'text-purple-800'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    icon: 'bg-indigo-100 text-indigo-600',
    title: 'text-indigo-600',
    value: 'text-indigo-800'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    icon: 'bg-orange-100 text-orange-600',
    title: 'text-orange-600',
    value: 'text-orange-800'
  }
};

const StatisticsCard = ({ icon, title, value, description, color = 'blue' }) => {
  const styles = colorClasses[color];

  return (
    <div className={`card ${styles.bg} border ${styles.border}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${styles.icon}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          <p className={`mt-1 text-2xl font-semibold ${styles.value}`}>{value}</p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;