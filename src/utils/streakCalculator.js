/**
 * Calculates streak-related metrics from a list of todos
 * @param {Array} todos - The list of todos to analyze
 * @returns {Object} An object containing streak metrics
 */
export const calculateStreakMetrics = (todos) => {
  // Extract completion dates from todos
  const completedTodos = todos.filter(todo => todo.completed);
  const completionDates = completedTodos.map(todo => 
    new Date(todo.completedAt).toISOString().split('T')[0]
  );

  // Get unique dates
  const uniqueDates = [...new Set(completionDates)].sort();
  
  // Calculate current streak
  const currentStreak = calculateCurrentStreak(uniqueDates);
  
  // Calculate longest streak
  const longestStreak = calculateLongestStreak(uniqueDates);
  
  // Calculate daily activity (for heat map)
  const dailyActivity = calculateDailyActivity(completionDates);
  
  // Calculate completion by day of week
  const completionByDay = calculateCompletionByDay(completionDates);
  
  // Calculate weekly completion rate
  const weeklyCompletion = calculateWeeklyCompletionRate(uniqueDates);

  return {
    currentStreak,
    longestStreak,
    totalCompletedTasks: completedTodos.length,
    weeklyCompletion,
    dailyActivity,
    completionByDay
  };
};

/**
 * Calculates the current streak (consecutive days with completed todos)
 * @param {Array} uniqueDates - Array of unique dates with completed todos
 * @returns {Number} The current streak count
 */
const calculateCurrentStreak = (uniqueDates) => {
  if (uniqueDates.length === 0) return 0;
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // Check if there's activity today or yesterday to count as current streak
  const hasRecentActivity = uniqueDates.includes(today) || uniqueDates.includes(yesterday);
  if (!hasRecentActivity) return 0;
  
  // Start counting from the most recent date
  let currentStreak = 1;
  let lastDate = uniqueDates.includes(today) ? today : yesterday;
  
  for (let i = uniqueDates.length - 1; i >= 0; i--) {
    const currentDate = uniqueDates[i];
    if (currentDate === today || currentDate === yesterday) continue;
    
    const dayDiff = getDayDifference(new Date(lastDate), new Date(currentDate));
    if (dayDiff === 1) {
      currentStreak++;
      lastDate = currentDate;
    } else {
      break;
    }
  }
  
  return currentStreak;
};

/**
 * Calculates the longest streak (consecutive days with completed todos)
 * @param {Array} uniqueDates - Array of unique dates with completed todos
 * @returns {Number} The longest streak count
 */
const calculateLongestStreak = (uniqueDates) => {
  if (uniqueDates.length === 0) return 0;
  if (uniqueDates.length === 1) return 1;
  
  let longestStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < uniqueDates.length; i++) {
    const dayDiff = getDayDifference(new Date(uniqueDates[i]), new Date(uniqueDates[i-1]));
    if (dayDiff === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }
  
  return longestStreak;
};

/**
 * Gets the difference in days between two dates
 */
const getDayDifference = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
};

/**
 * Creates a map of dates and their activity counts
 */
const calculateDailyActivity = (completionDates) => {
  const activityMap = {};
  
  // Initialize past 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    activityMap[dateStr] = 0;
  }
  
  // Count completions per day
  completionDates.forEach(date => {
    if (activityMap[date] !== undefined) {
      activityMap[date]++;
    }
  });
  
  return activityMap;
};

/**
 * Calculates completion rate by day of week
 */
const calculateCompletionByDay = (completionDates) => {
  const dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  
  const completionByDay = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday': 0
  };
  
  completionDates.forEach(dateStr => {
    const date = new Date(dateStr);
    const day = dayMap[date.getDay()];
    completionByDay[day]++;
  });
  
  return completionByDay;
};

/**
 * Calculates the completion rate for the current week
 */
const calculateWeeklyCompletionRate = (uniqueDates) => {
  // Get dates for current week
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);
  
  const weekDates = [];
  for (let i = 0; i <= dayOfWeek; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    weekDates.push(date.toISOString().split('T')[0]);
  }
  
  // Count days with activity this week
  const activeDaysThisWeek = weekDates.filter(date => uniqueDates.includes(date)).length;
  
  // Calculate percentage (days with activity / days passed in current week)
  return Math.round((activeDaysThisWeek / (dayOfWeek + 1)) * 100);
};