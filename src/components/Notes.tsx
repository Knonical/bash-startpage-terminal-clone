
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const Notes = () => {
  const [notes, setNotes] = React.useState<string[]>([]);
  const [newNote, setNewNote] = React.useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">$ cat notes.txt</div>
      <div className="min-h-[100px] mb-4">
        {notes.length === 0 ? (
          <div className="text-muted-foreground">No notes yet. Add one to get started!</div>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="mb-2">
              <span className="text-muted-foreground">{'>'}</span> {note}
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          className="flex-1 bg-background border border-border p-2 text-foreground"
          placeholder="Enter new note..."
        />
        <Button onClick={addNote} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
