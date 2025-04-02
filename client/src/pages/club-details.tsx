import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '@/utils/animation';
import { Club, Event, Review } from '@shared/schema';
import { 
  FaStar, FaMapMarkerAlt, FaClock, FaMusic, 
  FaGlassMartiniAlt, FaVolumeUp, FaCouch, 
  FaSmoking, FaParking, FaHandsHelping,
  FaPhoneAlt, FaExternalLinkAlt
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ClubDetails = () => {
  const { id } = useParams();
  const clubId = parseInt(id || '1');
  
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch club details
  const { data: club, isLoading: clubLoading, error: clubError } = useQuery<Club>({
    queryKey: [`/api/clubs/${clubId}`],
  });
  
  // Fetch club events
  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: [`/api/events/club/${clubId}`],
  });
  
  // Fetch club reviews
  const { data: reviews, isLoading: reviewsLoading, refetch: refetchReviews } = useQuery<Review[]>({
    queryKey: [`/api/reviews/${clubId}`],
  });
  
  // Handle review submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your review text",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clubId,
          userId: 1, // This would come from auth context in a real app
          rating: userRating,
          comment: reviewText
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      toast({
        title: "Review submitted",
        description: "Thank you for sharing your experience!"
      });
      
      // Reset form
      setReviewText('');
      setUserRating(5);
      
      // Refetch reviews
      refetchReviews();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Features rendering
  const renderFeatures = () => {
    const featureIcons: Record<string, JSX.Element> = {
      'Craft Cocktails': <FaGlassMartiniAlt className="text-accent mr-2" />,
      'DJ Nights': <FaVolumeUp className="text-accent mr-2" />,
      'VIP Areas': <FaCouch className="text-accent mr-2" />,
      'Smoking Terrace': <FaSmoking className="text-accent mr-2" />,
      'Valet Parking': <FaParking className="text-accent mr-2" />,
      'Table Service': <FaHandsHelping className="text-accent mr-2" />
    };
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {club?.features?.map((feature, index) => (
          <div key={index} className="flex items-center">
            {featureIcons[feature] || <FaGlassMartiniAlt className="text-accent mr-2" />}
            <span className="text-muted">{feature}</span>
          </div>
        ))}
      </div>
    );
  };
  
  if (clubLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted">Loading club details...</p>
        </div>
      </div>
    );
  }
  
  if (clubError || !club) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Club Not Found</h1>
          <p className="text-muted mb-6">Sorry, we couldn't find the club you're looking for.</p>
          <Link href="/clubs">
            <Button>Browse All Clubs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{club.name} - Drinking Buddy</title>
        <meta name="description" content={club.description} />
      </Helmet>
      
      <div className="bg-background">
        {/* Hero Image & Basic Info */}
        <div className="relative h-[50vh]">
          <img 
            src={club.images?.[0] || "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1950&q=80"}
            alt={club.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                  <div className="mb-2">
                    {club.isFeatured && (
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">
                        Featured Club
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{club.name}</h1>
                  <div className="flex items-center mb-2 flex-wrap">
                    <div className="review-stars flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(club.rating) ? "text-accent" : "text-gray-500"} 
                        />
                      ))}
                    </div>
                    <span className="text-muted">{club.rating} ({club.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-accent mr-2" />
                    <span className="text-muted">{club.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                  <Button className="bg-accent hover:bg-accent/90 text-primary">
                    <FaPhoneAlt className="mr-2" /> Contact
                  </Button>
                  <Button variant="outline">
                    <FaExternalLinkAlt className="mr-2" /> Visit Website
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details & Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-8">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">About {club.name}</h2>
                    <p className="text-muted mb-6">{club.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-secondary bg-opacity-30 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-3">Opening Hours</h3>
                        <div className="flex items-center">
                          <FaClock className="text-accent mr-2" />
                          <span className="text-muted">{club.openHours}</span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary bg-opacity-30 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-3">Music</h3>
                        <div className="flex items-center">
                          <FaMusic className="text-accent mr-2" />
                          <span className="text-muted">{club.musicTypes?.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
                    {renderFeatures()}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="events">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events at {club.name}</h2>
                    
                    {eventsLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-24 bg-secondary bg-opacity-30 rounded-lg animate-pulse"></div>
                        ))}
                      </div>
                    ) : events && events.length > 0 ? (
                      <div className="space-y-4">
                        {events.map(event => (
                          <div key={event.id} className="bg-secondary bg-opacity-30 p-4 rounded-lg">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                              <div>
                                <h3 className="font-semibold text-white text-lg mb-1">{event.name}</h3>
                                <p className="text-sm text-muted mb-2">{event.date} • {event.time}</p>
                                <p className="text-sm text-muted line-clamp-2">{event.description}</p>
                              </div>
                              <Link href={`/events/${event.id}`}>
                                <Button variant="outline" size="sm" className="mt-3 md:mt-0">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted">No upcoming events scheduled at this club.</p>
                        <p className="text-accent mt-2">Check back later for updates!</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Reviews & Ratings</h2>
                      <div className="flex items-center">
                        <div className="review-stars flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < Math.floor(club.rating) ? "text-accent" : "text-gray-500"} 
                            />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-white">{club.rating}</span>
                      </div>
                    </div>
                    
                    {/* Write a review */}
                    <div className="bg-secondary bg-opacity-30 p-6 rounded-lg mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Share Your Experience</h3>
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                          <label className="block text-muted mb-2">Your Rating</label>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setUserRating(star)}
                                className="focus:outline-none"
                              >
                                <FaStar 
                                  className={`text-2xl ${star <= userRating ? 'text-accent' : 'text-gray-500'} 
                                    hover:text-accent transition-colors`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-muted mb-2">Your Review</label>
                          <Textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share your experience at this club..."
                            className="bg-background border-primary min-h-[120px]"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="bg-accent hover:bg-accent/90 text-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </form>
                    </div>
                    
                    {/* Reviews list */}
                    {reviewsLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-32 bg-secondary bg-opacity-30 rounded-lg animate-pulse"></div>
                        ))}
                      </div>
                    ) : reviews && reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map(review => (
                          <div key={review.id} className="bg-secondary bg-opacity-30 p-6 rounded-lg">
                            <div className="flex items-start">
                              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mr-4">
                                <span className="font-semibold">
                                  {review.userId.toString().charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-semibold text-white">User {review.userId}</h4>
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <FaStar 
                                          key={i} 
                                          className={`text-sm ${i < review.rating ? 'text-accent' : 'text-gray-500'}`} 
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <span className="text-xs text-muted">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-muted">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted">No reviews yet. Be the first to share your experience!</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="gallery">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Photo Gallery</h2>
                    
                    {club.images && club.images.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {club.images.map((image, index) => (
                          <div key={index} className="rounded-lg overflow-hidden aspect-square">
                            <img 
                              src={image}
                              alt={`${club.name} - Image ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted">No gallery images available for this club.</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Info Card */}
              <motion.div 
                className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={slideInRight}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">At a Glance</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted">Price Range:</span>
                      <span className="text-white font-medium">{club.priceRange}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted">Distance:</span>
                      <span className="text-white font-medium">{club.distance} miles away</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted">Category:</span>
                      <span className="text-white font-medium">{club.category?.join(', ')}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted">Music:</span>
                      <span className="text-white font-medium">{club.musicTypes?.join(', ')}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted">Hours:</span>
                      <span className="text-white font-medium">{club.openHours}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 my-6"></div>
                  
                  <Button className="w-full bg-accent hover:bg-accent/90 text-primary mb-3">
                    Make a Reservation
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <FaMapMarkerAlt className="mr-2" /> Get Directions
                  </Button>
                </div>
              </motion.div>
              
              {/* Map Card */}
              <motion.div 
                className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={slideInRight}
                transition={{ delay: 0.2 }}
              >
                <div className="h-64 bg-secondary bg-opacity-50 flex items-center justify-center">
                  <div className="text-center p-4">
                    <FaMapMarkerAlt className="text-accent text-4xl mx-auto mb-3" />
                    <p className="text-white font-medium mb-1">{club.name}</p>
                    <p className="text-muted text-sm">{club.location}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Similar Clubs */}
              <motion.div 
                className="bg-secondary bg-opacity-30 rounded-lg overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={slideInRight}
                transition={{ delay: 0.3 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Similar Clubs</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1556035511-3168381ea4d4?auto=format&fit=crop&w=100&q=80"
                        alt="Similar club"
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-white">Velvet Underground</h4>
                        <div className="flex items-center">
                          <div className="review-stars flex mr-1">
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-gray-500 text-xs" />
                          </div>
                          <span className="text-muted text-xs">4.7</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=100&q=80"
                        alt="Similar club"
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-white">Rhythm & Blues</h4>
                        <div className="flex items-center">
                          <div className="review-stars flex mr-1">
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-gray-500 text-xs" />
                          </div>
                          <span className="text-muted text-xs">4.5</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1581974944026-5d6ed762f617?auto=format&fit=crop&w=100&q=80"
                        alt="Similar club"
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-white">Metro Lounge</h4>
                        <div className="flex items-center">
                          <div className="review-stars flex mr-1">
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                            <FaStar className="text-accent text-xs" />
                          </div>
                          <span className="text-muted text-xs">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="link" className="text-accent px-0 mt-2">
                    View All Similar Clubs
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubDetails;
