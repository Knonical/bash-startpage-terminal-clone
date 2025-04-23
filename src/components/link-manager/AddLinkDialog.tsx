
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ICONS } from '@/constants/icons';
import { LinkGroup } from '@/types/link';

interface AddLinkDialogProps {
  groups: LinkGroup[];
  newLink: {
    title: string;
    url: string;
    group: string;
    icon: string;
  };
  setNewLink: (link: {
    title: string;
    url: string;
    group: string;
    icon: string;
  }) => void;
  onAddLink: () => void;
}

export const AddLinkDialog = ({
  groups,
  newLink,
  setNewLink,
  onAddLink,
}: AddLinkDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Link</DialogTitle>
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
          Add Link
        </Button>
      </div>
    </DialogContent>
  );
};

