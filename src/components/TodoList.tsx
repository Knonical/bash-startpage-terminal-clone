
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">$ cat todo.txt</div>
      <div className="min-h-[100px] mb-4">
        {todos.length === 0 ? (
          <div className="text-muted-foreground">No tasks yet. Add one to get started!</div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 mb-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-4 h-4 border ${todo.completed ? 'bg-primary border-primary' : 'border-muted-foreground'} flex items-center justify-center`}
              >
                {todo.completed && <Check className="h-3 w-3 text-primary-foreground" />}
              </button>
              <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                {todo.text}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 bg-background border border-border p-2 text-foreground"
          placeholder="Enter new task..."
        />
        <Button onClick={addTodo} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
