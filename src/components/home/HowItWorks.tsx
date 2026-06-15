
import React from 'react';
import { FileText, User, Calendar, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="h-12 w-12 text-legal-primary" />,
    title: "Choose a Service",
    description: "Select from legal templates, lawyer consultations, or educational resources."
  },
  {
    icon: <User className="h-12 w-12 text-legal-primary" />,
    title: "Get Connected",
    description: "Find the right lawyer based on expertise and availability, or access self-help templates."
  },
  {
    icon: <Calendar className="h-12 w-12 text-legal-primary" />,
    title: "Book & Schedule",
    description: "Book appointments with lawyers or download and customize legal templates."
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-legal-primary" />,
    title: "Problem Solved",
    description: "Get your legal matters resolved with expert assistance or the right documentation."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-legal-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-legal-primary mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes accessing legal assistance simple and straightforward with just a few steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg shadow-md p-8 text-center relative z-10">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-legal-primary">Step {index + 1}</h3>
                <h4 className="text-lg font-medium mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-legal-primary z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
