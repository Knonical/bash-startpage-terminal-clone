import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Link, LinkGroup } from '@/types/link';
import { AddGroupDialog } from './link-manager/AddGroupDialog';
import { AddLinkDialog } from './link-manager/AddLinkDialog';
import { LinkGroups } from './link-manager/LinkGroups';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'bookmark-groups';

export const LinkManager = () => {
  const [groups, setGroups] = useState<LinkGroup[]>([]);
  const [newGroup, setNewGroup] = useState('');
  const [newLink, setNewLink] = useState<Link>({ id: '', title: '', url: '', group: '', icon: 'link' });
  const [showAddLink, setShowAddLink] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedGroups = localStorage.getItem(STORAGE_KEY);
    if (savedGroups) {
      try {
        const parsedGroups = JSON.parse(savedGroups);
        setGroups(parsedGroups);
      } catch (error) {
        console.error('Error loading saved groups:', error);
      }
    }
  }, []);

  // Guardar en localStorage cada vez que cambien los grupos
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    }
  }, [groups]);

  const addGroup = () => {
    if (newGroup.trim()) {
      setGroups([...groups, { name: newGroup, links: [] }]);
      setNewGroup('');
      setShowAddLink(true);
      setShowAddGroup(false);
      setDialogOpen(false);
      toast.success(`Grupo "${newGroup}" añadido con éxito`);
    }
  };

  const addLink = () => {
    if (newLink.title && newLink.url && newLink.group) {
      if (isEditing) {
        // Si estamos editando, actualizamos el enlace existente
        setGroups(groups.map(group => {
          if (group.name === newLink.group) {
            return {
              ...group,
              links: group.links.map(link => 
                link.id === newLink.id ? newLink : link
              )
            };
          }
          return group;
        }));
        toast.success(`Enlace "${newLink.title}" actualizado`);
      } else {
        // Si estamos añadiendo, creamos un nuevo enlace con ID único
        const linkWithId = { ...newLink, id: uuidv4() };
        setGroups(groups.map(group => {
          if (group.name === newLink.group) {
            return {
              ...group,
              links: [...group.links, linkWithId]
            };
          }
          return group;
        }));
        toast.success(`Enlace "${newLink.title}" añadido a "${newLink.group}"`);
      }
      
      setNewLink({ id: '', title: '', url: '', group: '', icon: 'link' });
      setDialogOpen(false);
      setIsEditing(false);
    }
  };

  const handleEditLink = (groupName: string, link: Link) => {
    setNewLink({ ...link, group: groupName });
    setIsEditing(true);
    setShowAddGroup(false);
    setShowAddLink(true);
    setDialogOpen(true);
  };

  const handleDeleteLink = (groupName: string, linkId: string) => {
    setGroups(groups.map(group => {
      if (group.name === groupName) {
        return {
          ...group,
          links: group.links.filter(link => link.id !== linkId)
        };
      }
      return group;
    }));
    toast.success("Enlace eliminado");
  };

  const openAddGroupDialog = () => {
    setShowAddGroup(true);
    setShowAddLink(false);
    setDialogOpen(true);
  };

  const openAddLinkDialog = () => {
    setShowAddGroup(false);
    setShowAddLink(true);
    setIsEditing(false);
    setNewLink({ id: '', title: '', url: '', group: '', icon: 'link' });
    setDialogOpen(true);
  };

  return (
    <div className="terminal-container h-full">
      <div className="terminal-header">$ cat bookmarks.txt</div>
      <div className="min-h-[150px] mb-4">
        <LinkGroups 
          groups={groups} 
          onEditLink={handleEditLink}
          onDeleteLink={handleDeleteLink}
        />
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
            isEditing={isEditing}
          />
        )}
      </Dialog>
    </div>
  );
};
