import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/animation';
import { Club } from '@shared/schema';
import ClubCard from '@/components/club-card';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: clubs, isLoading, error } = useQuery<Club[]>({
    queryKey: ['/api/clubs'],
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Would trigger search in a real app
  };
  
  // Filter clubs based on search query
  const filteredClubs = searchQuery
    ? clubs?.filter(club => 
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clubs;

  return (
    <>
      <Helmet>
        <title>Best Clubs - Drinking Buddy</title>
        <meta name="description" content="Discover top-rated nightlife spots in your area. Find the perfect club for your night out." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/80 to-secondary/80 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Discover the Best Clubs</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find the perfect spot for your night out with our curated selection of top-rated clubs and venues
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search by name, location, or vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-full text-lg"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
            </form>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-secondary bg-opacity-30 rounded-xl shadow-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-xl text-destructive">Failed to load clubs. Please try again later.</p>
            </div>
          ) : filteredClubs?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-muted">No clubs found matching your search. Try different keywords.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredClubs?.map((club, index) => (
                <ClubCard key={club.id} club={club} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Clubs;
