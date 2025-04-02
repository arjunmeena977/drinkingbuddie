import { User } from "@shared/schema";
import { FaGlassMartiniAlt, FaMusic, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { slideUp } from "@/utils/animation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PartnerCardProps {
  partner: User;
  index?: number;
}

const PartnerCard = ({ partner, index = 0 }: PartnerCardProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate connection request
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Connection Request Sent",
        description: `You've sent a connection request to ${partner.fullName}.`,
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
            alt={`${partner.fullName}, ${partner.age}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-xl text-white">
              {partner.fullName?.split(' ')[0] || partner.username}, {partner.age}
            </h4>
            <span className="bg-green-500 w-3 h-3 rounded-full"></span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center">
              <FaGlassMartiniAlt className="text-accent mr-2" />
              <span className="text-muted text-sm">
                {partner.drinkPreferences?.join(', ') || "Any drinks"}
              </span>
            </div>
            <div className="flex items-center">
              <FaMusic className="text-accent mr-2" />
              <span className="text-muted text-sm">
                {partner.musicTaste?.join(', ') || "All genres"}
              </span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-accent mr-2" />
              <span className="text-muted text-sm">2.3 miles away</span>
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
