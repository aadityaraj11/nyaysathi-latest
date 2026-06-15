import React from 'react';
import Navbar from '../layout/Navbar';
import SidebarNav from './SidebarNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex flex-1 relative">
        <SidebarNav />
        <main className={cn(
          "flex-1 p-6 overflow-y-auto",
          isMobile ? "w-full" : "ml-0"
        )}>
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;