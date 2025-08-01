
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export const TimeProgress = () => {
  const [progress, setProgress] = useState({
    day: 0,
    week: 0,
    month: 0,
    year: 0
  });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      
      // Format digital time (24h format)
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      
      // Day progress
      const dayProgress = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 864;
      
      // Week progress (0-6, where 0 is Sunday)
      const dayOfWeek = now.getDay();
      const weekProgress = ((dayOfWeek * 24 * 3600 + now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / (7 * 24 * 3600)) * 100;
      
      // Month progress
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const monthProgress = (now.getDate() / daysInMonth) * 100;
      
      // Year progress
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const yearProgress = ((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24 * 365)) * 100;
      
      setProgress({
        day: dayProgress,
        week: weekProgress,
        month: monthProgress,
        year: yearProgress
      });
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-container">
      <div className="terminal-header flex justify-between items-center">
        <span>$ progress</span>
        <span className="text-sm">{currentTime}</span>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Day</span>
            <span>{progress.day.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-value" style={{ width: `${progress.day}%` }} />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Week</span>
            <span>{progress.week.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-value" style={{ width: `${progress.week}%` }} />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Month</span>
            <span>{progress.month.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-value" style={{ width: `${progress.month}%` }} />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Year</span>
            <span>{progress.year.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-value" style={{ width: `${progress.year}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
