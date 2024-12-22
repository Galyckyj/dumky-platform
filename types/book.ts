export interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  rating?: number;
  price?: number;
  isFavorite?: boolean;
}

export type BookCategory = 'fantasy' | 'romance' | 'detective' | 'drama' | 'adventure' | 'thriller' | 'horror' | 'mystery' | 'science fiction' | 'non-fiction' | 'biography' | 'history' | 'poetry' | 'classic' | 'other' | 'self-help' | 'action';
