
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ICONS } from '@/constants/icons';
import { Link, LinkGroup } from '@/types/link';

interface AddLinkDialogProps {
  groups: LinkGroup[];
  newLink: Link;
  setNewLink: (link: Link) => void;
  onAddLink: () => void;
  isEditing?: boolean;
}

export const AddLinkDialog = ({
  groups,
  newLink,
  setNewLink,
  onAddLink,
  isEditing = false,
}: AddLinkDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Edit Link' : 'Add New Link'}</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="Enter link title..."
            className="flex-1"
            autoFocus
          />
          <select
            value={newLink.icon}
            onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
            className="w-24 bg-background border border-border p-2 text-foreground"
          >
            {Object.keys(ICONS).map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
        <Input
          type="text"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          placeholder="Enter URL (https://...)..."
        />
        <div className="flex gap-2">
          <select
            value={newLink.group}
            onChange={(e) => setNewLink({ ...newLink, group: e.target.value })}
            className="flex-1 bg-background border border-border p-2 text-foreground"
            disabled={isEditing}
          >
            <option value="">Select group...</option>
            {groups.map((group) => (
              <option key={group.name} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={onAddLink} variant="outline" className="w-full">
          {isEditing ? 'Save Changes' : 'Add Link'}
        </Button>
      </div>
    </DialogContent>
  );
};
