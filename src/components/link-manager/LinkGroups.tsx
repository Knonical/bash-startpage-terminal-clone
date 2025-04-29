
import React from 'react';
import { LinkGroup } from '@/types/link';
import { ICONS } from '@/constants/icons';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LinkGroupsProps {
  groups: LinkGroup[];
  onEditLink: (groupName: string, link: Link) => void;
  onDeleteLink: (groupName: string, linkId: string) => void;
}

export const LinkGroups = ({ groups, onEditLink, onDeleteLink }: LinkGroupsProps) => {
  const renderIcon = (iconName: string) => {
    const IconComponent = ICONS[iconName as keyof typeof ICONS];
    return <IconComponent className="h-4 w-4 text-muted-foreground" />;
  };

  if (groups.length === 0) {
    return (
      <div className="text-muted-foreground">No bookmarks yet. Add a group to get started!</div>
    );
  }

  return (
    <Accordion type="multiple" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {groups.map((group) => (
        <AccordionItem key={group.name} value={group.name} className="border rounded-lg p-2">
          <AccordionTrigger className="hover:no-underline">
            <div className="text-primary">/{group.name}</div>
          </AccordionTrigger>
          <AccordionContent>
            {group.links.map((link) => (
              <div key={link.id} className="flex items-center gap-2 mb-2 ml-4">
                <div className="flex-1 flex items-center gap-2">
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
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onEditLink(group.name, link);
                    }}
                    className="p-1 hover:bg-muted rounded-md"
                    aria-label="Edit link"
                  >
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onDeleteLink(group.name, link.id);
                    }}
                    className="p-1 hover:bg-muted rounded-md"
                    aria-label="Delete link"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
