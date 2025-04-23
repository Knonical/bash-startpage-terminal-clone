
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { LinkGroup } from '@/types/link';
import { AddGroupDialog } from './link-manager/AddGroupDialog';
import { AddLinkDialog } from './link-manager/AddLinkDialog';
import { LinkGroups } from './link-manager/LinkGroups';

export const LinkManager = () => {
  const [groups, setGroups] = useState<LinkGroup[]>([]);
  const [newGroup, setNewGroup] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '', group: '', icon: 'link' });
  const [showAddLink, setShowAddLink] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addGroup = () => {
    if (newGroup.trim()) {
      setGroups([...groups, { name: newGroup, links: [] }]);
      setNewGroup('');
      setShowAddLink(true);
      setShowAddGroup(false);
      setDialogOpen(false);
    }
  };

  const addLink = () => {
    if (newLink.title && newLink.url && newLink.group) {
      setGroups(groups.map(group => {
        if (group.name === newLink.group) {
          return {
            ...group,
            links: [...group.links, { title: newLink.title, url: newLink.url, icon: newLink.icon }]
          };
        }
        return group;
      }));
      setNewLink({ ...newLink, title: '', url: '' });
      setDialogOpen(false);
    }
  };

  const openAddGroupDialog = () => {
    setShowAddGroup(true);
    setShowAddLink(false);
    setDialogOpen(true);
  };

  const openAddLinkDialog = () => {
    setShowAddGroup(false);
    setShowAddLink(true);
    setDialogOpen(true);
  };

  return (
    <div className="terminal-container h-full">
      <div className="terminal-header">$ cat bookmarks.txt</div>
      <div className="min-h-[150px] mb-4">
        <LinkGroups groups={groups} />
      </div>
      
      <div className="flex gap-2">
        <Button onClick={openAddGroupDialog} variant="outline" className="flex-1">
          Add Group
        </Button>
        <Button onClick={openAddLinkDialog} variant="outline" className="flex-1" disabled={groups.length === 0}>
          Add Link
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {showAddGroup ? (
          <AddGroupDialog
            newGroup={newGroup}
            setNewGroup={setNewGroup}
            onAddGroup={addGroup}
          />
        ) : (
          <AddLinkDialog
            groups={groups}
            newLink={newLink}
            setNewLink={setNewLink}
            onAddLink={addLink}
          />
        )}
      </Dialog>
    </div>
  );
};

