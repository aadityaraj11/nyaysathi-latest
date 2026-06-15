
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, User, Search, Shield , Book} from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-legal-light to-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-legal-primary mb-6 leading-tight">
              Legal assistance <span className="text-legal-accent">simplified</span> for everyone
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Access legal templates, find qualified lawyers, book appointments, and understand your rights - all in one platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-legal-primary hover:bg-legal-secondary text-white px-8 py-6 text-lg" asChild>
                <Link to="/templates">Get Legal Templates</Link>
              </Button>
              <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-light px-8 py-6 text-lg" asChild>
                <Link to="/lawyers">Find a Lawyer</Link>
              </Button>
            </div>
          </div>
                  
          <div className="lg:w-1/2 grid grid-cols-2 gap-6 animate-fade-in">
          <a href = "/legal-library">
            <div role="button" className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-legal-primary">
              <Book className="h-12 w-12 text-legal-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Library</h3>
              <p className="text-gray-600">Access simplified explanations of IPC and CRPC sections with helpful mind maps.</p>
            </div>
          </a>  
          <a href = "/lawyers">
            <div role="button" className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-legal-accent">
              <User className="h-12 w-12 text-legal-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Lawyers</h3>
              <p className="text-gray-600">Connect with qualified lawyers specialized in your specific legal matters.</p>
            </div>
          </a>
          <a href = "/legal-assistant">
            <div role="button" className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-legal-secondary">
              <Search className="h-12 w-12 text-legal-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Assistant</h3>
              <p className="text-gray-600">Get AI-powered assistance with legal questions and concerns.</p>
            </div>
          </a>
          <a href = "/know-your-rights">  
            <div role="button" className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-legal-primary">
              <Shield className="h-12 w-12 text-legal-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Know Your Rights</h3>
              <p className="text-gray-600">Learn about your legal rights in various situations and scenarios.</p>
            </div>
          </a>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
