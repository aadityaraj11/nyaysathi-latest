
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-legal-primary text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6" />
              <span className="text-xl font-bold">NyayaSathi</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Making legal assistance accessible to everyone. Get informed about your rights and connect with qualified legal professionals.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/templates" className="text-gray-300 hover:text-white transition duration-300">Legal Templates</Link></li>
              <li><Link to="/lawyers" className="text-gray-300 hover:text-white transition duration-300">Find Lawyers</Link></li>
              <li><Link to="/my-appointments" className="text-gray-300 hover:text-white transition duration-300">Book Appointments</Link></li>
              <li><Link to="/know-your-rights" className="text-gray-300 hover:text-white transition duration-300">Know Your Rights</Link></li>
              <li><Link to="/legal-library" className="text-gray-300 hover:text-white transition duration-300">Legal Library</Link></li>
            </ul>
          </div>
          
          {/* For Lawyers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Lawyers</h3>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-300 hover:text-white transition duration-300">Join as a Lawyer</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white transition duration-300">Lawyer Login</Link></li>
           </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={18} />
                <span className="text-gray-300">support@nyayaSathi.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} />
                <span className="text-gray-300">+91 840967651</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">48 Church St, Ashok Nagar Bengaluru</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LegalAssist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
