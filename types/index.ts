import { Icon } from 'iconsax-react';

export interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  description: string;
}

export interface MenuItem {
  id: number;
  icon: Icon;
  label: string;
  href: string;
}
