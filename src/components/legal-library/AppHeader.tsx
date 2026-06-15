
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const AppHeader = () => {
  return (
    <header className="bg-legal-primary text-white py-4 border-b border-legal-gold">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold">Legal Advisor</Link>
        </div>
        <div className="w-full md:w-1/3 relative">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-legal-gray h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Search legal resources..." 
              className="pl-8 bg-white text-black w-full" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;