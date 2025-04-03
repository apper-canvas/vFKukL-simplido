import React from 'react';
import { Calendar, Award, Zap, BarChart2 } from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import StreakCalendar from './StreakCalendar';

const StreakStats = ({ streakStats }) => {
  const { 
    currentStreak, 
    longestStreak, 
    totalCompletedTasks, 
    weeklyCompletion,
    dailyActivity,
    completionByDay
  } = streakStats;

  // Find the most productive day
  const mostProductiveDay = Object.entries(completionByDay)
    .sort(([, countA], [, countB]) => countB - countA)[0];

  return (
    <div className="space-y-6">
      {/* Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-purple-50 border border-purple-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Zap className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-purple-600">Current Streak</h3>
              <p className="mt-1 text-2xl font-semibold text-purple-800">{currentStreak} days</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-purple-50 border border-purple-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Award className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-purple-600">Longest Streak</h3>
              <p className="mt-1 text-2xl font-semibold text-purple-800">{longestStreak} days</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-purple-50 border border-purple-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <BarChart2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-purple-600">Completed Todos</h3>
              <p className="mt-1 text-2xl font-semibold text-purple-800">{totalCompletedTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-purple-50 border border-purple-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-purple-600">Most Productive</h3>
              <p className="mt-1 text-2xl font-semibold text-purple-800">
                {mostProductiveDay ? mostProductiveDay[0] : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weekly Progress */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <ProgressCircle percentage={weeklyCompletion} />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800">This Week's Completion</h3>
            <p className="text-sm text-gray-600 mt-1">
              You've completed tasks on {weeklyCompletion}% of days this week.
            </p>
            {currentStreak > 0 ? (
              <p className="mt-2 text-sm text-purple-700">
                <span className="font-medium">🔥 {currentStreak} day streak!</span> Keep it up to maintain your momentum.
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Complete a task today to start a new streak!
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Activity Calendar */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Activity Calendar</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your todo completion activity over the last 30 days
        </p>
        <StreakCalendar dailyActivity={dailyActivity} />
      </div>
    </div>
  );
};

export default StreakStats;