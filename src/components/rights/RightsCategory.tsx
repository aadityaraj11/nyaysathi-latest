
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, Info, FileText, Shield, Check } from 'lucide-react';

export interface RightDetailSection {
  title: string;
  content: string;
}


export interface RightItem {
  id: string;
  title: string;
  description: string;
  sections?: RightDetailSection[];
  relevantCases?: string[];
  keyExceptions?: string[];
}

export interface RightsCategoryProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  rights: RightItem[];
  className?: string;
}

const RightsCategory: React.FC<RightsCategoryProps> = ({
  id,
  title,
  icon,
  description,
  rights,
  className,
}) => {
  const [expandedRights, setExpandedRights] = useState<Record<string, boolean>>({});
  
  const toggleRightDetails = (rightId: string) => {
    setExpandedRights(prev => ({
      ...prev,
      [rightId]: !prev[rightId]
    }));
  };

  return (
    <div id={id} className={cn("bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden", className)}>
      <div className="bg-legal-muted p-6 flex items-center gap-4 border-b border-gray-100">
        <div className="bg-white p-3 rounded-full shadow-sm">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="px-2 py-2">
        {rights.map((right) => (
          <AccordionItem key={right.id} value={right.id} className="border-b border-gray-100 last:border-0">
            <AccordionTrigger className="py-4 px-4 text-gray-800 hover:text-legal-primary hover:bg-legal-muted/50 rounded-md font-medium">
              {right.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-0 text-gray-700 leading-relaxed">
              <div className="pb-4">
                {right.description}
              </div>
              
              {/* Detailed sections */}
              {right.sections && right.sections.length > 0 && (
                <div className="mb-4">
                  {right.sections.map((section, index) => (
                    <div key={index} className="mb-4 bg-gray-50 rounded-md p-4">
                      <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-legal-secondary" />
                        {section.title}
                      </h4>
                      <p className="text-gray-700">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Relevant cases */}
              {right.relevantCases && right.relevantCases.length > 0 && (
                <Collapsible className="mb-4 border border-gray-100 rounded-md">
                  <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-legal-primary" />
                      Relevant Legal Cases
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 ease-in-out ui-open:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <ul className="list-disc ml-5 space-y-1 text-gray-700">
                      {right.relevantCases.map((item, index) => (
                        <li key={index}><a href={item}>case {index+1}</a></li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              )}
              
              {/* Key exceptions */}
              {right.keyExceptions && right.keyExceptions.length > 0 && (
                <Collapsible className="mb-4 border border-gray-100 rounded-md">
                  <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-legal-secondary" />
                      Key Exceptions
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 ease-in-out ui-open:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <ul className="list-disc ml-5 space-y-1 text-gray-700">
                      {right.keyExceptions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RightsCategory;