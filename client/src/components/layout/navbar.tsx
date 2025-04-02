import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FaGlassCheers, FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  
  // Check if user is logged in (in a real app, this would check the session/token)
  useEffect(() => {
    // For demo purposes, we'll check if there's user data in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    // Clear user data and set logged out state
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    // Redirect to home
    window.location.href = '/';
  };
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Best Clubs", path: "/clubs" },
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
            
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none flex items-center">
                  <div className="flex items-center space-x-2 text-white">
                    <FaUserCircle className="text-xl text-accent" />
                    <span className="font-medium">{user.username}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/favorites" className="w-full">My Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin">
                <Button className="bg-accent text-[#121212] hover:bg-accent/90 px-6 py-2 rounded-full font-semibold">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-2 border-t border-gray-700">
            <div className="flex flex-col space-y-3 mt-3">
              {/* User Profile Section for Mobile */}
              {isLoggedIn && user && (
                <div className="flex items-center py-2 border-b border-gray-700 mb-2">
                  <FaUserCircle className="text-2xl text-accent mr-2" />
                  <div>
                    <p className="font-semibold text-white">{user.username}</p>
                    <p className="text-xs text-muted">Signed in</p>
                  </div>
                </div>
              )}
              
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
              
              {isLoggedIn && user ? (
                <>
                  <Link href="/profile" className="text-white hover:text-accent transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link href="/favorites" className="text-white hover:text-accent transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                    My Favorites
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-destructive py-2 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-accent text-[#121212] hover:bg-accent/90 px-6 py-2 rounded-full font-semibold">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
