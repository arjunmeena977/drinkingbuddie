import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/utils/animation";
import { FaStar, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Club, Event } from "@shared/schema";

const FeaturedSection = () => {
  const { data: featuredClub, isLoading: clubLoading } = useQuery<Club[]>({
    queryKey: ['/api/clubs/featured/1'],
  });
  
  const { data: featuredEvent, isLoading: eventLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/featured/1'],
  });
  
  const club = featuredClub?.[0];
  const event = featuredEvent?.[0];

  return (
    <section id="featured" className="py-16 bg-gradient-to-b from-[#121212] to-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">Tonight's <span className="text-accent">Highlights</span></h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            The hottest spots and events happening right now, curated just for you
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Featured Club */}
          <motion.div 
            className="bg-[#121212] rounded-xl shadow-lg overflow-hidden card-hover"
            variants={fadeIn}
          >
            <div className="relative h-64">
              <img 
                src={club?.images?.[0] || "https://images.unsplash.com/photo-1581974944026-5d6ed762f617?auto=format&fit=crop&w=800&q=80"}
                alt={club?.name || "Featured Club"} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured Club
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-2xl text-white mb-2">{club?.name || "Featured Club"}</h3>
              <div className="flex items-center mb-4">
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < Math.floor(club?.rating || 4.5) ? "opacity-100" : "opacity-30"} ${i === Math.floor(club?.rating || 4.5) && (club?.rating || 4.5) % 1 > 0 ? "opacity-50" : ""}`} />
                  ))}
                </div>
                <span className="ml-2 text-muted">{club?.rating || 4.5} ({club?.reviewCount || 128} reviews)</span>
              </div>
              <p className="text-muted mb-4">{club?.description || "The hottest dance floors with world-class DJs every weekend."}</p>
              <Link href={`/clubs/${club?.id || 1}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Featured Event */}
          <motion.div 
            className="bg-[#121212] rounded-xl shadow-lg overflow-hidden card-hover"
            variants={fadeIn}
          >
            <div className="relative h-64">
              <img 
                src={event?.image || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?auto=format&fit=crop&w=800&q=80"}
                alt={event?.name || "Featured Event"} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-destructive text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Hot Event
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-2xl text-white mb-2">{event?.name || "Summer Blast Party"}</h3>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-accent mr-2" />
                <span className="text-muted">{event?.date || "Tonight"}, {event?.time || "10 PM - 5 AM"}</span>
              </div>
              <p className="text-muted mb-4">{event?.description || "The season's biggest rooftop party with open bar for the first hour."}</p>
              <Link href={`/events/${event?.id || 1}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Drinking Buddy Match */}
          <motion.div 
            className="bg-[#121212] rounded-xl shadow-lg overflow-hidden card-hover"
            variants={fadeIn}
          >
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
                alt="Find your drinking partner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New Connections
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-2xl text-white mb-2">Find Your Match</h3>
              <div className="flex items-center mb-4">
                <FaUsers className="text-accent mr-2" />
                <span className="text-muted">137 active members tonight</span>
              </div>
              <p className="text-muted mb-4">Connect with like-minded people who share your taste in drinks and venues. Never party alone again.</p>
              <Link href="/partners">
                <Button className="w-full">
                  Find a Buddy
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
