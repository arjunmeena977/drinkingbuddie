import { Link } from "wouter";
import { FaGlassCheers, FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FaGlassCheers className="text-accent text-3xl" />
              <span className="font-bold text-2xl text-white">Drinking<span className="text-accent">Buddy</span></span>
            </div>
            <p className="text-muted mb-6">
              Your ultimate companion for discovering the best nightlife experiences and connecting with like-minded party enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted hover:text-accent transition-colors" aria-label="Facebook">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors" aria-label="TikTok">
                <FaTiktok className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/clubs" className="text-muted hover:text-accent transition-colors">Best Clubs</Link></li>
              <li><Link href="/partners" className="text-muted hover:text-accent transition-colors">Find a Buddy</Link></li>
              <li><Link href="/events" className="text-muted hover:text-accent transition-colors">Events</Link></li>
              <li><Link href="/about" className="text-muted hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl text-white mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Safety Center</Link></li>
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Community Guidelines</Link></li>
              <li><Link href="/privacy" className="text-muted hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl text-white mb-6">Newsletter</h3>
            <p className="text-muted mb-4">
              Subscribe to our newsletter for exclusive nightlife tips and special offers.
            </p>
            <form className="space-y-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-[#121212] border border-primary text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" 
                required 
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-secondary px-4 py-2 rounded-lg font-semibold transition-colors">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DrinkingBuddy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-muted hover:text-accent transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-muted hover:text-accent transition-colors text-sm">Terms of Service</Link>
              <Link href="#" className="text-muted hover:text-accent transition-colors text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
