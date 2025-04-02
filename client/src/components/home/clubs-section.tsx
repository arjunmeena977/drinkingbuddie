import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/utils/animation";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import ClubCard from "@/components/club-card";
import { Club } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ClubsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: clubs, isLoading } = useQuery<Club[]>({
    queryKey: ['/api/clubs'],
  });
  
  const filteredClubs = clubs?.slice(0, 3);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would trigger a search query
    console.log("Searching for:", searchQuery);
  };

  return (
    <section id="clubs" className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex justify-between items-center mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h2 className="font-bold text-3xl md:text-4xl text-white mb-2">Top Rated <span className="text-accent">Clubs</span></h2>
            <p className="text-lg text-muted">Discover the best nightlife spots in your area</p>
          </div>
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary border border-primary text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
            </form>
          </div>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-secondary bg-opacity-30 rounded-xl shadow-lg h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredClubs?.map((club, index) => (
              <ClubCard key={club.id} club={club} index={index} />
            ))}
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-center mt-10"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/clubs">
            <Button className="btn-primary px-8 py-3 text-lg flex items-center gap-2">
              View All Clubs
              <FaArrowRight />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubsSection;
