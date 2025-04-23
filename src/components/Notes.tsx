
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  id: number;
  content: string;
  preview: string;
}

export const Notes = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [newNote, setNewNote] = React.useState('');
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [isAddingNote, setIsAddingNote] = React.useState(false);

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        preview: newNote.slice(0, 100) + (newNote.length > 100 ? '...' : '')
      };
      setNotes([...notes, note]);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="terminal-container h-full flex flex-col">
      <div className="terminal-header">$ cat notes.txt</div>
      <div className="flex-1 mb-4 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-muted-foreground">No notes yet. Add one to get started!</div>
        ) : (
          notes.map((note) => (
            <div 
              key={note.id} 
              className="mb-2 cursor-pointer hover:bg-accent/50 p-2 rounded-sm"
              onClick={() => setSelectedNote(note)}
            >
              <span className="text-muted-foreground">{'>'}</span> {note.preview}
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => setIsAddingNote(true)} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Dialog for adding new notes */}
      <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[200px]"
            />
            <Button onClick={addNote}>Save Note</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for viewing existing notes */}
      <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Note</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap py-4">
            {selectedNote?.content}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
