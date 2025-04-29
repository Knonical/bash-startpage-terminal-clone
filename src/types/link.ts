
export interface LinkGroup {
  name: string;
  links: Link[];
}

export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  group?: string; // Added group property
}
