/**
 * Calculates time-based metrics for task completion
 * @param {Array} todos - The list of todos to analyze
 * @returns {Object} Time-based metrics
 */
export const calculateTimeMetrics = (todos) => {
  // Filter completed todos with proper timestamps
  const completedTodos = todos.filter(todo => 
    todo.completed && todo.completedAt && todo.createdAt
  );
  
  if (completedTodos.length === 0) {
    return {
      avgCompletionTime: 0,
      maxCompletionTime: 0,
      minCompletionTime: 0,
      medianCompletionTime: 0,
      completionTimeDistribution: [],
      timeOfDayDistribution: { morning: 0, afternoon: 0, evening: 0, night: 0 }
    };
  }
  
  // Calculate completion times in hours
  const completionTimes = completedTodos.map(todo => {
    const createdDate = new Date(todo.createdAt);
    const completedDate = new Date(todo.completedAt);
    const diffHours = Math.abs(completedDate - createdDate) / (1000 * 60 * 60);
    return diffHours;
  });
  
  // Sort for easier calculations
  completionTimes.sort((a, b) => a - b);
  
  // Calculate metrics
  const avgCompletionTime = completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length;
  const maxCompletionTime = completionTimes[completionTimes.length - 1];
  const minCompletionTime = completionTimes[0];
  
  // Calculate median
  const middle = Math.floor(completionTimes.length / 2);
  const medianCompletionTime = completionTimes.length % 2 === 0
    ? (completionTimes[middle - 1] + completionTimes[middle]) / 2
    : completionTimes[middle];
  
  // Calculate time of day distribution
  const timeOfDayDistribution = completedTodos.reduce((acc, todo) => {
    const hour = new Date(todo.completedAt).getHours();
    
    if (hour >= 5 && hour < 12) {
      acc.morning += 1;
    } else if (hour >= 12 && hour < 17) {
      acc.afternoon += 1;
    } else if (hour >= 17 && hour < 21) {
      acc.evening += 1;
    } else {
      acc.night += 1;
    }
    
    return acc;
  }, { morning: 0, afternoon: 0, evening: 0, night: 0 });
  
  // Calculate distribution for histogram (0-1h, 1-4h, 4-8h, 8-24h, 24h+)
  const completionTimeDistribution = [
    { range: '0-1 hour', count: 0 },
    { range: '1-4 hours', count: 0 },
    { range: '4-8 hours', count: 0 },
    { range: '8-24 hours', count: 0 },
    { range: '1-3 days', count: 0 },
    { range: '3+ days', count: 0 }
  ];
  
  completionTimes.forEach(time => {
    if (time <= 1) {
      completionTimeDistribution[0].count += 1;
    } else if (time <= 4) {
      completionTimeDistribution[1].count += 1;
    } else if (time <= 8) {
      completionTimeDistribution[2].count += 1;
    } else if (time <= 24) {
      completionTimeDistribution[3].count += 1;
    } else if (time <= 72) {
      completionTimeDistribution[4].count += 1;
    } else {
      completionTimeDistribution[5].count += 1;
    }
  });
  
  return {
    avgCompletionTime,
    maxCompletionTime,
    minCompletionTime,
    medianCompletionTime,
    completionTimeDistribution,
    timeOfDayDistribution
  };
};

/**
 * Calculates category-based metrics for todos
 * @param {Array} todos - The list of todos to analyze
 * @returns {Object} Category metrics
 */
export const calculateCategoryMetrics = (todos) => {
  if (todos.length === 0) {
    return {
      categoryDistribution: [],
      categoryCompletionRates: [],
      mostProductiveCategory: null,
      leastProductiveCategory: null
    };
  }
  
  // Initialize category metrics
  const categoryMetrics = todos.reduce((acc, todo) => {
    const category = todo.category;
    
    if (!acc[category]) {
      acc[category] = {
        name: category,
        total: 0,
        completed: 0,
        avgCompletionTime: 0,
        completionTimes: []
      };
    }
    
    acc[category].total += 1;
    
    if (todo.completed) {
      acc[category].completed += 1;
      
      if (todo.completedAt && todo.createdAt) {
        const createdDate = new Date(todo.createdAt);
        const completedDate = new Date(todo.completedAt);
        const diffHours = Math.abs(completedDate - createdDate) / (1000 * 60 * 60);
        acc[category].completionTimes.push(diffHours);
      }
    }
    
    return acc;
  }, {});
  
  // Calculate average completion times and rates
  Object.values(categoryMetrics).forEach(category => {
    if (category.completionTimes.length > 0) {
      const total = category.completionTimes.reduce((sum, time) => sum + time, 0);
      category.avgCompletionTime = total / category.completionTimes.length;
    }
    
    category.completionRate = category.total > 0 
      ? (category.completed / category.total) * 100 
      : 0;
  });
  
  // Prepare data for distribution and completion rates
  const categoryDistribution = Object.values(categoryMetrics).map(category => ({
    name: category.name,
    value: category.total
  }));
  
  const categoryCompletionRates = Object.values(categoryMetrics).map(category => ({
    name: category.name,
    rate: category.completionRate
  }));
  
  // Find most and least productive categories
  const productivityMetrics = Object.values(categoryMetrics)
    .filter(category => category.total >= 3); // Only consider categories with at least 3 todos
  
  const mostProductiveCategory = productivityMetrics.length > 0
    ? productivityMetrics.reduce((prev, current) => 
        (current.completionRate > prev.completionRate) ? current : prev
      )
    : null;
    
  const leastProductiveCategory = productivityMetrics.length > 0
    ? productivityMetrics.reduce((prev, current) => 
        (current.completionRate < prev.completionRate) ? current : prev
      )
    : null;
  
  return {
    categoryDistribution,
    categoryCompletionRates,
    mostProductiveCategory,
    leastProductiveCategory,
    categoryDetails: Object.values(categoryMetrics)
  };
};

/**
 * Calculates velocity metrics - how quickly tasks are completed over time
 * @param {Array} todos - The list of todos to analyze
 * @param {Number} days - Number of days to analyze
 * @returns {Object} Velocity metrics
 */
export const calculateVelocityMetrics = (todos, days = 30) => {
  // Only use completed todos
  const completedTodos = todos.filter(todo => todo.completed && todo.completedAt);
  
  if (completedTodos.length === 0) {
    return {
      completionVelocity: 0,
      weeklyVelocity: 0,
      trendData: []
    };
  }
  
  // Create start date (days ago from today)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);
  
  // Filter todos completed in the period
  const periodCompletedTodos = completedTodos.filter(todo => 
    new Date(todo.completedAt) >= startDate
  );
  
  // Create a map of all dates in the period
  const dailyCompletions = {};
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const dateString = date.toISOString().split('T')[0];
    dailyCompletions[dateString] = 0;
  }
  
  // Count completed todos by day
  periodCompletedTodos.forEach(todo => {
    const dateString = new Date(todo.completedAt).toISOString().split('T')[0];
    if (dailyCompletions[dateString] !== undefined) {
      dailyCompletions[dateString] += 1;
    }
  });
  
  // Calculate velocities
  const totalCompleted = periodCompletedTodos.length;
  const completionVelocity = totalCompleted / days;
  
  // Calculate weekly velocity (last 7 days)
  let lastWeekTotal = 0;
  Object.entries(dailyCompletions)
    .sort((a, b) => b[0].localeCompare(a[0])) // Sort in descending order
    .slice(0, 7) // Get last 7 days
    .forEach(([, count]) => {
      lastWeekTotal += count;
    });
  const weeklyVelocity = lastWeekTotal / 7;
  
  // Prepare trend data
  const trendData = Object.entries(dailyCompletions)
    .map(([date, count]) => {
      const dateObj = new Date(date);
      return {
        date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return {
    completionVelocity,
    weeklyVelocity,
    trendData
  };
};