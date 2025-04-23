
import React from 'react';
import { LinkGroup } from '@/types/link';
import { ICONS } from '@/constants/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LinkGroupsProps {
  groups: LinkGroup[];
}

export const LinkGroups = ({ groups }: LinkGroupsProps) => {
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
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

