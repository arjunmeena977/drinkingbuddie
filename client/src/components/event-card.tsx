import { Link } from "wouter";
import { Event } from "@shared/schema";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideUp } from "@/utils/animation";

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  return (
    <motion.div 
      className="bg-secondary bg-opacity-30 rounded-xl shadow-lg overflow-hidden card-hover"
      variants={slideUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative">
        <img 
          src={event.image || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"}
          alt={event.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg font-medium text-sm">
          {event.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-white mb-2">{event.name}</h3>
        <div className="flex items-center mb-3">
          <FaCalendarAlt className="text-accent mr-2" />
          <span className="text-muted">{event.date} • {event.time}</span>
        </div>
        <div className="flex items-center mb-3">
          <FaMapMarkerAlt className="text-accent mr-2" />
          <span className="text-muted">{event.location}</span>
        </div>
        <p className="text-muted mb-4 line-clamp-2">{event.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-accent font-semibold">${event.price}</span>
            <span className="text-muted text-sm ml-1">{event.ticketInfo}</span>
          </div>
          <Link href={`/events/${event.id}`}>
            <button className="btn-outline text-sm px-4 py-1">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
