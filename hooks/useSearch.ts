import { useState, useCallback } from 'react';
import { Book } from '@/types/book';
import { books } from '@/constants/books';

export function useSearch() {
  const [searchResults, setSearchResults] = useState<Book[]>(books);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setSearchQuery(query);
  }, []);

  return { searchResults, searchQuery, handleSearch };
}