
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Link as LinkIcon, Bookmark, Globe, Heart, Star, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface LinkGroup {
  name: string;
  links: Link[];
}

interface Link {
  title: string;
  url: string;
  icon: string;
}

const ICONS = {
  bookmark: Bookmark,
  globe: Globe,
  heart: Heart,
  star: Star,
  link: LinkIcon,
  external: ExternalLink
};

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

  const renderIcon = (iconName: string) => {
    const IconComponent = ICONS[iconName as keyof typeof ICONS] || LinkIcon;
    return <IconComponent className="h-4 w-4 text-muted-foreground" />;
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
        {groups.length === 0 ? (
          <div className="text-muted-foreground">No bookmarks yet. Add a group to get started!</div>
        ) : (
          groups.map((group) => (
            <div key={group.name} className="mb-4">
              <div className="text-primary mb-2">/{group.name}</div>
              {group.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2 mb-1 ml-4">
                  {renderIcon(link.icon)}
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    {link.title}
                  </a>
                </div>
              ))}
            </div>
          ))
        )}
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{showAddGroup ? "Add New Group" : "Add New Link"}</DialogTitle>
          </DialogHeader>
          
          {showAddGroup && (
            <div className="space-y-2">
              <Input
                type="text"
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGroup()}
                placeholder="Enter group name..."
                className="flex-1"
                autoFocus
              />
              <Button onClick={addGroup} variant="outline" className="w-full">
                Add Group
              </Button>
            </div>
          )}

          {showAddLink && (
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
              <Button onClick={addLink} variant="outline" className="w-full">
                Add Link
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
