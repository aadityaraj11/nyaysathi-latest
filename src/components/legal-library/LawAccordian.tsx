
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LawItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LawAccordionProps {
  items: LawItem[];
}

const LawAccordion: React.FC<LawAccordionProps> = ({ items }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map(item => (
        <AccordionItem 
          key={item.id} 
          value={item.id}
          className="border rounded-md mb-3 bg-white shadow-sm overflow-hidden"
        >
          <AccordionTrigger className="text-left text-md font-medium hover:text-legal-primary px-5 py-4">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-5 border-t text-slate-600">
              {item.content}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LawAccordion;