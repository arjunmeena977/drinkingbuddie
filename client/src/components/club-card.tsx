import { Link } from "wouter";
import { Club } from "@shared/schema";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideUp } from "@/utils/animation";

interface ClubCardProps {
  club: Club;
  index?: number;
  compact?: boolean;
}

const ClubCard = ({ club, index = 0, compact = false }: ClubCardProps) => {
  return (
    <motion.div 
      className={`bg-secondary bg-opacity-30 rounded-xl shadow-lg overflow-hidden card-hover`}
      variants={slideUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative h-64">
        <img 
          src={club.images?.[0] || "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80"}
          alt={club.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
        <div className="absolute top-4 right-4 bg-accent text-secondary px-2 py-1 rounded-lg font-bold">
          {club.rating} <FaStar className="inline ml-1" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-white mb-2">{club.name}</h3>
        <div className="flex items-center mb-3">
          <FaMapMarkerAlt className="text-accent mr-2" />
          <span className="text-muted">{club.location}</span>
        </div>
        <p className="text-muted mb-4 line-clamp-2">{club.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-accent font-semibold mr-1">{club.priceRange}</span>
            <span className="text-muted">{club.priceRange === "$" ? "Budget" : (club.priceRange === "$$" ? "Mid-range" : "High-end")}</span>
          </div>
          <Link href={`/clubs/${club.id}`}>
            <button className="btn-outline text-sm px-4 py-1">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubCard;
