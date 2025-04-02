import { User } from "@shared/schema";
import { FaGlassMartiniAlt, FaMusic, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { slideUp } from "@/utils/animation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Partner type to match our expected partner data
interface Partner {
  id: number;
  username?: string;
  profileImage?: string | null;
  fullName?: string | null;
  age?: number | null;
  gender?: string | null;
  preferences?: {
    drinkType?: string[];
    musicTaste?: string[];
    favoriteVenues?: string[];
  };
  drinkPreferences?: string[] | null;
  musicTaste?: string[] | null;
  vibePref?: string | null;
  distance?: number;
  availability?: string;
  bio?: string;
  isActive?: boolean | null;
}

interface PartnerCardProps {
  partner: Partner;
  index?: number;
}

const PartnerCard = ({ partner, index = 0 }: PartnerCardProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Helper function to get drink preferences from either source
  const getDrinkPreferences = () => {
    if (partner.preferences && Array.isArray(partner.preferences.drinkType)) {
      return partner.preferences.drinkType.join(', ');
    } else if (Array.isArray(partner.drinkPreferences)) {
      return partner.drinkPreferences.join(', ');
    }
    return "Any drinks";
  };
  
  // Helper function to get music taste from either source
  const getMusicTaste = () => {
    if (partner.preferences && Array.isArray(partner.preferences.musicTaste)) {
      return partner.preferences.musicTaste.join(', ');
    } else if (Array.isArray(partner.musicTaste)) {
      return partner.musicTaste.join(', ');
    }
    return "All genres";
  };
  
  // Helper function to get the displayed name
  const getDisplayName = () => {
    if (partner.fullName) {
      return partner.fullName.split(' ')[0];
    } else if (partner.username) {
      return partner.username;
    }
    return "Buddy";
  };
  
  // Generate a random age if not provided (for demo)
  const age = partner.age || Math.floor(Math.random() * 15) + 21;
  
  // Generate a random distance if not provided (for demo)
  const distance = partner.distance !== undefined ? partner.distance : 
    parseFloat((Math.random() * 10).toFixed(1));
  
  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate connection request
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Connection Request Sent",
        description: `You've sent a connection request to ${getDisplayName()}.`,
      });
    }, 1000);
  };

  return (
    <motion.div 
      className="bg-secondary bg-opacity-30 rounded-xl shadow-lg overflow-hidden card-hover"
      variants={slideUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex">
        <div className="w-1/3">
          <img 
            src={partner.profileImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"}
            alt={`${getDisplayName()}, ${age}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-xl text-white">
              {getDisplayName()}, {age}
            </h4>
            <span className="bg-green-500 w-3 h-3 rounded-full"></span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center">
              <FaGlassMartiniAlt className="text-accent mr-2" />
              <span className="text-muted text-sm">
                {getDrinkPreferences()}
              </span>
            </div>
            <div className="flex items-center">
              <FaMusic className="text-accent mr-2" />
              <span className="text-muted text-sm">
                {getMusicTaste()}
              </span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-accent mr-2" />
              <span className="text-muted text-sm">{distance} miles away</span>
            </div>
          </div>
          <Button 
            onClick={handleConnect}
            disabled={isConnecting}
            className="mt-3 w-full bg-transparent border border-accent text-accent hover:bg-accent hover:text-secondary rounded-lg transition-colors text-sm"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PartnerCard;
