
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Calendar, Shield, Book, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <FileText className="h-12 w-12" />,
    title: "Legal Templates",
    description: "Access professionally drafted templates for rental agreements, loans, affidavits, and more.",
    link: "/templates",
    color: "text-blue-600"
  },
  {
    icon: <Users className="h-12 w-12" />,
    title: "Find Lawyers",
    description: "Connect with qualified lawyers based on expertise, experience, and availability.",
    link: "/lawyers",
    color: "text-green-600"
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "My Appointments",
    description: "Schedule consultations with lawyers based on their real-time availability.",
    link: "/appointments",
    color: "text-purple-600"
  },
  {
    icon: <Shield className="h-12 w-12" />,
    title: "Know Your Rights",
    description: "Learn about your legal rights in different situations like police custody, road rage, etc.",
    link: "/know-your-rights",
    color: "text-red-600"
  },
  {
    icon: <Book className="h-12 w-12" />,
    title: "Legal Library",
    description: "Access simplified explanations of IPC and CRPC sections with helpful mind maps.",
    link: "/legal-library",
    color: "text-amber-600"
  },
  {
    icon: <Search className="h-12 w-12" />,
    title: "Legal Assistant",
    description: "Get AI-powered assistance for your legal questions and concerns.",
    link: "/legal-assistant",
    color: "text-cyan-600"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-legal-primary mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for legal assistance in one place - from document templates to expert consultations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-legal-dark">{feature.title}</h3>
              <p className="text-gray-600 mb-5">{feature.description}</p>
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link to={feature.link}>Learn More</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
