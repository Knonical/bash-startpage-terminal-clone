
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddGroupDialogProps {
  newGroup: string;
  setNewGroup: (group: string) => void;
  onAddGroup: () => void;
}

export const AddGroupDialog = ({
  newGroup,
  setNewGroup,
  onAddGroup,
}: AddGroupDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Group</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <Input
          type="text"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAddGroup()}
          placeholder="Enter group name..."
          className="flex-1"
          autoFocus
        />
        <Button onClick={onAddGroup} variant="outline" className="w-full">
          Add Group
        </Button>
      </div>
    </DialogContent>
  );
};

