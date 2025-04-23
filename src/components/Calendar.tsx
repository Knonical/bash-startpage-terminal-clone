
import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Reminder } from '@/types/reminder';
import { ReminderDialog } from './ReminderDialog';
import { toast } from '@/components/ui/sonner';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [reminders, setReminders] = React.useState<Reminder[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsDialogOpen(true);
  };

  const handleSaveReminder = (reminderData: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: crypto.randomUUID()
    };
    setReminders([...reminders, newReminder]);
    toast.success('Reminder added successfully');
  };

  const getReminderForDate = (date: Date) => {
    return reminders.find(reminder => isSameDay(new Date(reminder.date), date));
  };

  return (
    <div className="terminal-container h-full flex flex-col">
      <div className="terminal-header">
        $ cal {format(currentDate, 'MMMM yyyy')}
      </div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="text-primary hover:text-muted-foreground">
          {'<'}
        </button>
        <span className="font-mono">{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={nextMonth} className="text-primary hover:text-muted-foreground">
          {'>'}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-xs text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center flex-1">
        {days.map(day => {
          const reminder = getReminderForDate(day);
          return (
            <button
              key={day.toString()}
              onClick={() => handleDayClick(day)}
              className={`p-0.5 text-sm hover:bg-accent relative ${
                isSameDay(day, selectedDate) ? 'bg-primary text-primary-foreground' : ''
              }`}
              style={reminder ? { backgroundColor: reminder.color } : undefined}
              title={reminder?.title}
            >
              {format(day, 'd')}
              {reminder && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <ReminderDialog
        date={selectedDate}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveReminder}
      />
    </div>
  );
};
