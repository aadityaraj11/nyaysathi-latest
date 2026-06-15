
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Gavel } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-legal-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Gavel className="h-16 w-16 text-legal-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            Join thousands of users who have simplified their legal journey. 
            Whether you need document templates, legal advice, or want to understand your rights better.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="bg-legal-accent hover:bg-legal-accent/90 text-legal-primary px-8 py-6 text-lg" asChild>
              <Link to="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-red-700 hover:bg-white/10 px-8 py-6 text-lg" asChild>
              <Link to="/lawyers">Find a Lawyer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
