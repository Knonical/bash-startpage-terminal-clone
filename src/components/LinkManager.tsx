
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LinkGroup {
  name: string;
  links: Link[];
}

interface Link {
  title: string;
  url: string;
}

export const LinkManager = () => {
  const [groups, setGroups] = useState<LinkGroup[]>([]);
  const [newGroup, setNewGroup] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '', group: '' });
  const [showAddLink, setShowAddLink] = useState(false);

  const addGroup = () => {
    if (newGroup.trim()) {
      setGroups([...groups, { name: newGroup, links: [] }]);
      setNewGroup('');
    }
  };

  const addLink = () => {
    if (newLink.title && newLink.url && newLink.group) {
      setGroups(groups.map(group => {
        if (group.name === newLink.group) {
          return {
            ...group,
            links: [...group.links, { title: newLink.title, url: newLink.url }]
          };
        }
        return group;
      }));
      setNewLink({ title: '', url: '', group: '' });
      setShowAddLink(false);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">$ cat bookmarks.txt</div>
      <div className="min-h-[100px] mb-4">
        {groups.length === 0 ? (
          <div className="text-muted-foreground">No bookmarks yet. Add a group to get started!</div>
        ) : (
          groups.map((group) => (
            <div key={group.name} className="mb-4">
              <div className="text-primary mb-2">/{group.name}</div>
              {group.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2 mb-1 ml-4">
                  <LinkIcon className="h-3 w-3 text-muted-foreground" />
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
      
      {!showAddLink ? (
        <div className="flex gap-2">
          <Input
            type="text"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addGroup()}
            placeholder="Enter group name..."
            className="flex-1"
          />
          <Button onClick={addGroup} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          {groups.length > 0 && (
            <Button onClick={() => setShowAddLink(true)} variant="outline">
              Add Link
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="Enter link title..."
          />
          <Input
            type="text"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="Enter URL..."
          />
          <select
            value={newLink.group}
            onChange={(e) => setNewLink({ ...newLink, group: e.target.value })}
            className="w-full bg-background border border-border p-2 text-foreground mb-2"
          >
            <option value="">Select group...</option>
            {groups.map((group) => (
              <option key={group.name} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <Button onClick={addLink} variant="outline" className="flex-1">
              Add Link
            </Button>
            <Button onClick={() => setShowAddLink(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
