
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  placeholder = "Search...", 
  onSearch 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button type="submit" className="bg-legal-primary hover:bg-legal-secondary">
        Search
      </Button>
    </form>
  );
};

export default SearchBox;