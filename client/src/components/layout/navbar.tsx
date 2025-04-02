import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FaGlassCheers } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Clubs", path: "/clubs" },
    { name: "Find Partners", path: "/partners" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-[#121212] py-3 px-4 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaGlassCheers className="text-accent text-3xl" />
            <span className="font-bold text-2xl text-white">Drinking<span className="text-accent">Buddy</span></span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="text-white h-6 w-6" />
            ) : (
              <Menu className="text-white h-6 w-6" />
            )}
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`font-medium text-sm ${
                  isActive(link.path) 
                    ? "text-accent" 
                    : "text-white hover:text-accent transition-colors"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/signin">
              <Button className="bg-accent text-[#121212] hover:bg-accent/90 px-6 py-2 rounded-full font-semibold">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-2 border-t border-gray-700">
            <div className="flex flex-col space-y-3 mt-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`font-medium py-2 ${
                    isActive(link.path) 
                      ? "text-accent" 
                      : "text-white hover:text-accent transition-colors"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-accent text-[#121212] hover:bg-accent/90 px-6 py-2 rounded-full font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
