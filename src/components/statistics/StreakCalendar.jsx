import React from 'react';

const StreakCalendar = ({ dailyActivity }) => {
  // Convert the dailyActivity object to an array for rendering
  const activityData = Object.entries(dailyActivity)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .map(([date, count]) => ({ date, count }));
  
  // Group by week for display
  const weeks = [];
  let currentWeek = [];
  
  // Get day of week (0-6, with 0 = Sunday)
  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Create weekly groups for the calendar display
  activityData.forEach((day, index) => {
    currentWeek.push(day);
    if ((index + 1) % 7 === 0 || index === activityData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  // Get color based on activity count
  const getActivityColor = (count) => {
    if (count === 0) return 'bg-purple-50';
    if (count === 1) return 'bg-purple-200';
    if (count === 2) return 'bg-purple-300';
    if (count > 2) return 'bg-purple-500';
  };

  return (
    <div className="overflow-x-auto">
      <div className="mt-4 min-w-full">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex mb-1">
            {week.map((day) => (
              <div 
                key={day.date} 
                className="relative group mr-1"
              >
                <div 
                  className={`w-6 h-6 rounded-sm ${getActivityColor(day.count)}`}
                  title={`${getFormattedDate(day.date)}: ${day.count} todos completed`}
                ></div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {getFormattedDate(day.date)}: {day.count} {day.count === 1 ? 'todo' : 'todos'}
                  </div>
                  <div className="arrow-down"></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center mt-2 text-xs text-gray-500">
        <span className="mr-1">Less</span>
        <div className="w-4 h-4 rounded-sm bg-purple-50 mr-1"></div>
        <div className="w-4 h-4 rounded-sm bg-purple-200 mr-1"></div>
        <div className="w-4 h-4 rounded-sm bg-purple-300 mr-1"></div>
        <div className="w-4 h-4 rounded-sm bg-purple-500 mr-1"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default StreakCalendar;