import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '@/utils/animation';
import { Event, Club } from '@shared/schema';
import { 
  FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTshirt, 
  FaGlassMartiniAlt, FaLightbulb, FaCamera, FaGift,
  FaShareAlt, FaCalendarPlus, FaUserFriends
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const EventDetails = () => {
  const { id } = useParams();
  const eventId = parseInt(id || '1');
  
  const [isAttending, setIsAttending] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  
  // Fetch event details
  const { data: event, isLoading: eventLoading, error: eventError } = useQuery<Event>({
    queryKey: [`/api/events/${eventId}`],
  });
  
  // Fetch club details if event has venueId
  const { data: venue } = useQuery<Club>({
    queryKey: [`/api/clubs/${event?.venueId}`],
    enabled: !!event?.venueId,
  });
  
  const handleGetTickets = () => {
    toast({
      title: "Purchase started",
      description: "Redirecting to ticket purchase page..."
    });
  };
  
  const handleAddToCalendar = () => {
    toast({
      title: "Added to calendar",
      description: "Event has been added to your calendar"
    });
  };
  
  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.name,
        text: event?.description,
        url: window.location.href,
      }).catch(() => {
        toast({
          title: "Share link copied",
          description: "Event link has been copied to clipboard"
        });
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Share link copied",
        description: "Event link has been copied to clipboard"
      });
    }
  };
  
  const handleFindBuddies = () => {
    toast({
      title: "Finding buddies",
      description: "Redirecting to drinking partners page..."
    });
  };
  
  const toggleAttending = () => {
    setIsAttending(!isAttending);
    toast({
      title: isAttending ? "Attendance removed" : "You're attending!",
      description: isAttending ? "You've been removed from the attendee list" : "You've been added to the attendee list"
    });
  };
  
  const toggleInterested = () => {
    setIsInterested(!isInterested);
    toast({
      title: isInterested ? "Interest removed" : "You're interested!",
      description: isInterested ? "You've been removed from the interested list" : "You've been added to the interested list"
    });
  };
  
  if (eventLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted">Loading event details...</p>
        </div>
      </div>
    );
  }
  
  if (eventError || !event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-muted mb-6">Sorry, we couldn't find the event you're looking for.</p>
          <Link href="/events">
            <Button>Browse All Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{event.name} - Drinking Buddy</title>
        <meta name="description" content={event.description} />
      </Helmet>
      
      <div className="bg-background">
        {/* Hero Image & Basic Info */}
        <div className="relative h-[50vh]">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?auto=format&fit=crop&w=1950&q=80"}
            alt={event.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                  <div className="mb-2">
                    {event.category && (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3 ${
                        event.category === 'Hot Event' ? 'bg-destructive text-white' : 
                        event.category === 'This Weekend' ? 'bg-primary text-white' :
                        event.category === 'This Week' ? 'bg-secondary text-white' :
                        'bg-accent/20 text-accent'
                      }`}>
                        {event.category}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{event.name}</h1>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-accent mr-2" />
                    <span className="text-muted">{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-accent mr-2" />
                    <span className="text-muted">{event.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:text-right mt-4 md:mt-0">
                  <div className="text-accent font-bold text-3xl mb-1">${event.price}</div>
                  <div className="text-muted text-sm mb-4">{event.ticketInfo}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <motion.div 
              className="lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
            >
              <h2 className="text-2xl font-bold text-white mb-6">About the Event</h2>
              <p className="text-muted mb-8">{event.description}</p>
              
              {event.artists && Array.isArray(event.artists) && event.artists.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Featured Artists</h3>
                  <div className="space-y-4">
                    {event.artists.map((artist: any, index: number) => (
                      <div key={index} className="bg-secondary bg-opacity-30 p-4 rounded-lg flex items-center">
                        {artist.image && (
                          <img 
                            src={artist.image}
                            alt={artist.name} 
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold text-white">{artist.name}</h4>
                          <p className="text-muted text-sm">{artist.role} • {artist.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">What to Expect</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <FaGlassMartiniAlt className="text-accent" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Signature Cocktails</h5>
                      <p className="text-muted text-sm">Specially crafted themed drinks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <FaLightbulb className="text-accent" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Light Show</h5>
                      <p className="text-muted text-sm">State-of-the-art visual production</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <FaCamera className="text-accent" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Photo Booth</h5>
                      <p className="text-muted text-sm">Free professional photos all night</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <FaGift className="text-accent" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Surprise Giveaways</h5>
                      <p className="text-muted text-sm">Chance to win exclusive prizes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {event.dressCode && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Dress Code</h3>
                  <div className="bg-secondary bg-opacity-30 p-4 rounded-lg">
                    <p className="text-muted">
                      <FaTshirt className="text-accent mr-2 inline-block" /> 
                      <span className="text-white font-semibold">Dress Code: </span>
                      {event.dressCode}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-primary py-6" onClick={handleGetTickets}>
                  Get Tickets
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 py-6"
                  onClick={handleAddToCalendar}
                >
                  <FaCalendarPlus className="mr-2" /> Add to Calendar
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 py-6"
                  onClick={handleShareEvent}
                >
                  <FaShareAlt className="mr-2" /> Share Event
                </Button>
              </div>
            </motion.div>
            
            {/* Right Column - Sidebar */}
            <motion.div 
              className="lg:col-span-1 space-y-8"
              initial="hidden"
              animate="visible"
              variants={slideInRight}
            >
              {/* Attend Action Card */}
              <div className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">RSVP</h3>
                  
                  <div className="flex gap-2 mb-6">
                    <Button 
                      className={`flex-1 ${isAttending ? 'bg-accent text-primary' : 'bg-secondary'}`} 
                      onClick={toggleAttending}
                    >
                      {isAttending ? 'Attending ✓' : 'Attend'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${isInterested ? 'border-accent text-accent' : ''}`}
                      onClick={toggleInterested}
                    >
                      {isInterested ? 'Interested ✓' : 'Interested'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted">Price:</span>
                    <span className="text-white font-semibold">${event.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted">Date:</span>
                    <span className="text-white font-semibold">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted">Time:</span>
                    <span className="text-white font-semibold">{event.time}</span>
                  </div>
                  
                  {venue && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted">Venue:</span>
                      <Link href={`/clubs/${venue.id}`}>
                        <span className="text-accent font-semibold hover:underline">{venue.name}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Attendees Card */}
              <div className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Who's Going</h3>
                  
                  <div className="bg-background bg-opacity-50 p-4 rounded-lg flex justify-between items-center mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-white flex items-center justify-center z-30">
                        <span className="text-xs font-bold">S</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary text-white flex items-center justify-center z-20">
                        <span className="text-xs font-bold">M</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-accent text-primary flex items-center justify-center z-10">
                        <span className="text-xs font-bold">A</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-white flex items-center justify-center">
                        <span className="text-xs font-bold">D</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary text-white flex items-center justify-center z-0">
                        <span className="text-xs font-bold">+{(event.attendeesCount || 0) - 4}</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">{event.attendeesCount || 0} going • {event.interestedCount || 0} interested</span>
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={handleFindBuddies}
                  >
                    <FaUserFriends className="mr-2" /> Find Buddies for this Event
                  </Button>
                </div>
              </div>
              
              {/* Location Card */}
              <div className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Location</h3>
                  
                  <div className="bg-secondary bg-opacity-50 h-48 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-accent text-3xl mx-auto mb-2" />
                      <p className="text-white font-medium">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-accent mr-2" />
                    <span className="text-muted">{event.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Similar Events */}
              <div className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Similar Events</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <img 
                        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=80"
                        alt="Similar event"
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-white">Throwback Thursday: 90s Hits</h4>
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-accent mr-1 text-xs" />
                          <span className="text-muted text-xs">July 13 • 9 PM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <img 
                        src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=100&q=80"
                        alt="Similar event"
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-white">Rooftop Summer Series</h4>
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-accent mr-1 text-xs" />
                          <span className="text-muted text-xs">July 21 • 8 PM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <img 
                        src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=100&q=80"
                        alt="Similar event"
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-white">Neon Nights: Glow Party</h4>
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-accent mr-1 text-xs" />
                          <span className="text-muted text-xs">July 15 • 10 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="link" className="text-accent px-0 mt-2">
                    View All Similar Events
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
