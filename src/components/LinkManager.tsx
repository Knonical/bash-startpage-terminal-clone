
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Link, LinkGroup } from '@/types/link';
import { AddGroupDialog } from './link-manager/AddGroupDialog';
import { AddLinkDialog } from './link-manager/AddLinkDialog';
import { LinkGroups } from './link-manager/LinkGroups';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Download, Upload } from 'lucide-react';

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

  const exportToJSON = () => {
    const dataToExport = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      groups: groups
    };
    
    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Enlaces exportados correctamente');
  };

  const importFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        // Validar estructura básica
        if (importedData.groups && Array.isArray(importedData.groups)) {
          setGroups(importedData.groups);
          toast.success('Enlaces importados correctamente');
        } else {
          toast.error('Formato de archivo no válido');
        }
      } catch (error) {
        console.error('Error importing JSON:', error);
        toast.error('Error al importar el archivo');
      }
    };
    
    reader.readAsText(file);
    // Limpiar el input para permitir seleccionar el mismo archivo otra vez
    event.target.value = '';
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
      
      <div className="flex gap-2 mb-4">
        <Button onClick={openAddGroupDialog} variant="outline" className="flex-1">
          Add Group
        </Button>
        <Button onClick={openAddLinkDialog} variant="outline" className="flex-1" disabled={groups.length === 0}>
          Add Link
        </Button>
      </div>

      <div className="flex gap-2">
        <Button onClick={exportToJSON} variant="outline" className="flex-1" disabled={groups.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Exportar JSON
        </Button>
        <div className="flex-1">
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
            id="json-import"
          />
          <Button 
            onClick={() => document.getElementById('json-import')?.click()}
            variant="outline" 
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar JSON
          </Button>
        </div>
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
