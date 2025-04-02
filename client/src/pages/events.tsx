import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/animation';
import { Event } from '@shared/schema';
import EventCard from '@/components/event-card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaSearch, FaCalendarDay, FaFire, FaCalendarWeek } from 'react-icons/fa';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Would trigger search in a real app
  };
  
  // Filter events based on search query and active tab
  const filteredEvents = events?.filter(event => {
    const matchesSearch = !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    if (activeTab === 'featured') return event.featured;
    if (activeTab === 'this-week') return event.category?.includes('This Week');
    if (activeTab === 'upcoming') return !event.category?.includes('This Week');
    
    return true; // 'all' tab
  });

  return (
    <>
      <Helmet>
        <title>Upcoming Events - Drinking Buddy</title>
        <meta name="description" content="Discover the hottest parties and nightlife events in your area. Never miss another epic night out." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/80 to-secondary/80 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Upcoming Events</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stay updated with the latest parties, gatherings, and nightlife events happening near you
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search events by name, venue, or DJ..."
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
          <Tabs defaultValue="all" className="mb-10" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FaCalendarDay /> All Events
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <FaFire /> Featured
              </TabsTrigger>
              <TabsTrigger value="this-week" className="flex items-center gap-2">
                <FaCalendarWeek /> This Week
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <FaCalendarDay /> Upcoming
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-secondary bg-opacity-30 rounded-xl shadow-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-xl text-destructive">Failed to load events. Please try again later.</p>
            </div>
          ) : filteredEvents?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-muted">No events found matching your search. Try different keywords or check back later.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredEvents?.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;
