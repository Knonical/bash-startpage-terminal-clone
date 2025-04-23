
import { Calendar } from '@/components/Calendar';
import { Notes } from '@/components/Notes';
import { TodoList } from '@/components/TodoList';
import { TimeProgress } from '@/components/TimeProgress';
import { LinkManager } from '@/components/LinkManager';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Calendar />
          <div className="space-y-4">
            <Notes />
            <TodoList />
            <LinkManager />
          </div>
          <div className="md:col-span-2">
            <TimeProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
