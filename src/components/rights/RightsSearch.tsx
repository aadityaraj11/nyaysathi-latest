
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface RightsSearchProps {
  onSearch: (query: string) => void;
}

const RightsSearch: React.FC<RightsSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="search"
          placeholder="Search for specific rights or legal topics..."
          className="pl-12 py-6 h-14 bg-white border-gray-300 rounded-full shadow-sm focus-visible:ring-legal-primary transition-all duration-300 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default RightsSearch;