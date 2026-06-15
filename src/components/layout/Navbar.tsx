import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, Book, FileText, User, Calendar, Shield, Search, Info } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from "../../firebase"; // adjust the path as needed
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed: " + error.message);
    }
  };

  const navLinks = [
    { name: 'Templates', path: '/templates', icon: <FileText className="h-5 w-5" /> },
    { name: 'Find Lawyers', path: '/lawyers', icon: <User className="h-5 w-5" /> },
    { name: 'My Appointments', path: '/booking', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Know Your Rights', path: '/know-your-rights', icon: <Shield className="h-5 w-5" /> },
    { name: 'Legal Library', path: '/legal-library', icon: <Book className="h-5 w-5" /> },
    { name: 'Legal Assistant', path: '/legal-assistant', icon: <Search className="h-5 w-5" /> },
  
  ];

  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-legal-primary" />
          <span className="text-2xl font-bold text-legal-primary font-montserrat">NyayaSathi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="hidden lg:flex space-x-5">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-gray-600 hover:text-legal-primary font-medium transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex space-x-3">
            {isLoggedIn ? (
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-legal-primary hover:bg-legal-secondary" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col h-full">
                <div className="py-4">
                  <h2 className="text-lg font-bold text-legal-primary px-4">LegalAssist</h2>
                </div>
                <div className="flex flex-col space-y-1 px-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-auto p-4 space-y-2">
                  {isLoggedIn ? (
                    <Button
                      className="w-full justify-center bg-red-500 hover:bg-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full justify-center" asChild>
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="w-full justify-center bg-legal-primary hover:bg-legal-secondary" asChild>
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
