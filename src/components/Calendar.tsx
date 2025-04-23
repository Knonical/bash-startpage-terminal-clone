
import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        $ cal {format(currentDate, 'MMMM yyyy')}
      </div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-primary hover:text-muted-foreground">
          {'<'}
        </button>
        <span className="font-mono">{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={nextMonth} className="text-primary hover:text-muted-foreground">
          {'>'}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-muted-foreground text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map(day => (
          <button
            key={day.toString()}
            onClick={() => setSelectedDate(day)}
            className={`p-1 hover:bg-accent ${
              isSameDay(day, selectedDate) ? 'bg-primary text-primary-foreground' : ''
            }`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};
