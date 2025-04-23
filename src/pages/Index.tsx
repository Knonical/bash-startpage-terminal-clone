
import { Calendar } from '@/components/Calendar';
import { Notes } from '@/components/Notes';
import { TodoList } from '@/components/TodoList';
import { TimeProgress } from '@/components/TimeProgress';
import { LinkManager } from '@/components/LinkManager';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primera columna */}
          <div className="space-y-4">
            <div className="h-60">
              <Calendar />
            </div>
            <Notes />
          </div>
          
          {/* Segunda columna */}
          <div>
            <TodoList />
          </div>
          
          {/* Tercera columna */}
          <div className="space-y-4">
            <div className="h-80">
              <LinkManager />
            </div>
            <TimeProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
