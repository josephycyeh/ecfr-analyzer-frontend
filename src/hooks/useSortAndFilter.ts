import { useState, useMemo } from 'react';

type SortableFields = 'word_count' | 'sections' | 'name';
type SortDirection = 'asc' | 'desc';

interface Sortable {
  name: string;
  word_count: number;
  sections: number;
}

export const useSortAndFilter = <T extends Sortable>(items: T[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortableFields | null>('word_count');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query)
      );
    }
    
    if (sortBy !== null) {
      result.sort((a, b) => {
        const comparison = sortBy === 'name' 
          ? a[sortBy].localeCompare(b[sortBy])
          : a[sortBy] - b[sortBy];
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return result;
  }, [items, searchQuery, sortBy, sortDirection]);

  const handleSort = (newSortBy: SortableFields) => {
    if (sortBy === newSortBy) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortBy(null);
        setSortDirection('asc');
      }
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    sortDirection,
    handleSort,
    filteredAndSortedItems
  };
}; 