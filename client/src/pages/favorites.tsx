import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animation';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface FavoriteItem {
  id: number;
  type: 'club' | 'event';
  name: string;
  image: string;
  location?: string;
  date?: string;
  description?: string;
}

const Favorites = () => {
  const [_, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      setLocation('/signin');
      return;
    }
    
    setIsLoggedIn(true);
    
    // In a real app, this would come from an API call based on the user's ID
    const demoFavorites = [
      {
        id: 1,
        type: 'club' as const,
        name: 'Pulse Nightclub',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Downtown, 123 Main Street',
        description: 'The hottest nightclub in the city featuring world-class DJs and a state-of-the-art sound system.'
      },
      {
        id: 2,
        type: 'event' as const,
        name: 'Summer Blast Party',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        date: 'July 10',
        location: 'Skyline Rooftop, 789 Highrise Blvd',
        description: "The season's biggest rooftop party with open bar for the first hour. Featuring DJ Maxwell."
      },
      {
        id: 3,
        type: 'club' as const,
        name: 'Skyline Lounge',
        image: 'https://images.unsplash.com/photo-1539758462369-43adaa19bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Uptown, 567 Heights Avenue',
        description: 'Upscale rooftop lounge with panoramic city views, craft cocktails, and intimate atmosphere.'
      },
      {
        id: 4,
        type: 'event' as const,
        name: 'Neon Nights: Glow Party',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        date: 'July 15',
        location: 'Pulse Nightclub',
        description: 'The ultimate UV party with neon paint, black lights, and the city\'s top EDM DJs.'
      }
    ];
    
    setFavorites(demoFavorites);
  }, [setLocation]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites"
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Favorites - Drinking Buddy</title>
        <meta name="description" content="View and manage your favorite clubs and events" />
      </Helmet>

      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My Favorites</h1>
            <p className="text-muted">View and manage your favorite clubs and events</p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Favorites</TabsTrigger>
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.length > 0 ? (
                  favorites.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial="hidden"
                      animate="visible"
                      variants={slideUp}
                      custom={index}
                      className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden shadow-lg"
                    >
                      <div className="relative h-48">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
                            onClick={() => handleRemoveFavorite(item.id)}
                          >
                            <FaHeart />
                          </Button>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            item.type === 'club' ? 'bg-primary text-white' : 'bg-accent text-primary'
                          }`}>
                            {item.type === 'club' ? 'Club' : 'Event'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                        
                        {item.location && (
                          <div className="flex items-center text-muted text-sm mb-2">
                            <FaMapMarkerAlt className="mr-1" /> {item.location}
                          </div>
                        )}
                        
                        {item.date && (
                          <div className="flex items-center text-muted text-sm mb-2">
                            <FaCalendarAlt className="mr-1" /> {item.date}
                          </div>
                        )}
                        
                        <p className="text-muted text-sm mb-4 line-clamp-2">{item.description}</p>
                        
                        <Link href={`/${item.type}s/${item.id}`}>
                          <Button variant="outline" className="w-full hover:bg-primary hover:text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-accent text-xl" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">No favorites yet</h3>
                    <p className="text-muted mb-4">Start exploring to add clubs and events to your favorites</p>
                    <div className="flex justify-center gap-4">
                      <Link href="/clubs">
                        <Button className="bg-primary text-white hover:bg-primary/90">
                          Explore Clubs
                        </Button>
                      </Link>
                      <Link href="/events">
                        <Button className="bg-accent text-primary hover:bg-accent/90">
                          Explore Events
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="clubs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.filter(item => item.type === 'club').length > 0 ? (
                  favorites
                    .filter(item => item.type === 'club')
                    .map((club, index) => (
                      <motion.div
                        key={club.id}
                        initial="hidden"
                        animate="visible"
                        variants={slideUp}
                        custom={index}
                        className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="relative h-48">
                          <img 
                            src={club.image} 
                            alt={club.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
                              onClick={() => handleRemoveFavorite(club.id)}
                            >
                              <FaHeart />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-white mb-2">{club.name}</h3>
                          
                          {club.location && (
                            <div className="flex items-center text-muted text-sm mb-2">
                              <FaMapMarkerAlt className="mr-1" /> {club.location}
                            </div>
                          )}
                          
                          <p className="text-muted text-sm mb-4 line-clamp-2">{club.description}</p>
                          
                          <Link href={`/clubs/${club.id}`}>
                            <Button variant="outline" className="w-full hover:bg-primary hover:text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-accent text-xl" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">No favorite clubs yet</h3>
                    <p className="text-muted mb-4">Explore and add clubs to your favorites</p>
                    <Link href="/clubs">
                      <Button className="bg-primary text-white hover:bg-primary/90">
                        Explore Clubs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.filter(item => item.type === 'event').length > 0 ? (
                  favorites
                    .filter(item => item.type === 'event')
                    .map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial="hidden"
                        animate="visible"
                        variants={slideUp}
                        custom={index}
                        className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="relative h-48">
                          <img 
                            src={event.image} 
                            alt={event.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
                              onClick={() => handleRemoveFavorite(event.id)}
                            >
                              <FaHeart />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                          
                          {event.date && (
                            <div className="flex items-center text-muted text-sm mb-2">
                              <FaCalendarAlt className="mr-1" /> {event.date}
                            </div>
                          )}
                          
                          {event.location && (
                            <div className="flex items-center text-muted text-sm mb-2">
                              <FaMapMarkerAlt className="mr-1" /> {event.location}
                            </div>
                          )}
                          
                          <p className="text-muted text-sm mb-4 line-clamp-2">{event.description}</p>
                          
                          <Link href={`/events/${event.id}`}>
                            <Button variant="outline" className="w-full hover:bg-accent hover:text-primary">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-accent text-xl" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">No favorite events yet</h3>
                    <p className="text-muted mb-4">Explore and add events to your favorites</p>
                    <Link href="/events">
                      <Button className="bg-accent text-primary hover:bg-accent/90">
                        Explore Events
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Favorites;