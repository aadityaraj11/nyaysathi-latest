
import React from 'react';
import { BookOpen, Clipboard, File, Gavel, HandshakeIcon, Info, MessageSquare, Search, Shield, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: "Adoption Rights", name: "Adoption Rights", icon: <Gavel className="h-5 w-5 text-legal-primary" /> },
  { id: "Appeals", name: "Appeals", icon: <Clipboard className="h-5 w-5 text-legal-primary" /> },
  { id: "Consumer Rights", name: "Consumer Rights", icon: <User className="h-5 w-5 text-legal-primary" /> },
//  { id: "Criminal Law", name: "Criminal Law", icon: <Shield className="h-5 w-5 text-legal-primary" /> },
  { id: "Family Law", name: "Family law", icon: <Users className="h-5 w-5 text-legal-primary" /> },
//  { id: "criminal", name: "Criminal Defense Rights", icon: <Shield className="h-5 w-5 text-legal-primary" /> },
//  { id: "immigration", name: "Immigration Rights", icon: <BookOpen className="h-5 w-5 text-legal-primary" /> },
//  { id: "healthcare", name: "Healthcare Rights", icon: <Info className="h-5 w-5 text-legal-primary" /> },
//  { id: "education", name: "Education Rights", icon: <BookOpen className="h-5 w-5 text-legal-primary" /> },
//  { id: "digital", name: "Digital & Privacy Rights", icon: <Shield className="h-5 w-5 text-legal-primary" /> }
];

interface RightsSidebarProps {
  activeCategory?: string;
  className?: string;
}

const RightsSidebar: React.FC<RightsSidebarProps> = ({ activeCategory, className }) => {
  return (
    <aside className={cn("bg-white border border-gray-100 rounded-lg shadow-sm p-4", className)}>
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
      </div>
      
      <nav>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "bg-legal-muted text-legal-primary"
                    : "text-gray-600 hover:text-legal-primary hover:bg-legal-muted/50"
                )}
              >
                {category.icon}
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-8 p-4 bg-legal-highlight rounded-lg">
        <h4 className="font-medium text-legal-primary flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Need Legal Help?
        </h4>
        <p className="text-sm text-gray-600 mt-2">
          Contact a legal advisor for personalized assistance with your specific situation.
        </p>
        <a 
          href="/lawyers" 
          className="mt-3 text-sm font-medium text-legal-primary hover:text-legal-secondary block"
        >
          Schedule a Consultation →
        </a>
      </div>
    </aside>
  );
};

export default RightsSidebar;