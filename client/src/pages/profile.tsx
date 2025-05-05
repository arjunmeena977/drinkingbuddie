import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '@/utils/animation';
import { 
  FaUser, FaEnvelope, FaGlassMartini, FaMusic, 
  FaMapMarkerAlt, FaCalendarAlt, FaGenderless, FaHeart
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface User {
  id?: number;
  name: string;
  email?: string;
  fullName?: string | null;
  age?: number | null;
  gender?: string | null;
  profileImage?: string | null;
  drinkPreferences?: string[] | null;
  musicTaste?: string[] | null;
  vibePref?: string | null;
}

interface FavoriteItem {
  id: number;
  type: 'club' | 'event';
  name: string;
  image: string;
  date?: string;
}

const Profile = () => {
  const [_, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<User | null>(null);

  // Loading user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setEditableUser(JSON.parse(userData));
    } else {
      // If not logged in, redirect to signin
      setLocation('/signin');
    }

    // Demo favorites data
    const demoFavorites = [
      {
        id: 1,
        type: 'club' as const,
        name: 'Pulse Nightclub',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 2,
        type: 'event' as const,
        name: 'Summer Blast Party',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
        date: 'July 10'
      }
    ];
    setFavorites(demoFavorites);
  }, [setLocation]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (editableUser) {
      // In a real app, you would send this to an API
      setUser(editableUser);
      localStorage.setItem('user', JSON.stringify(editableUser));
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditableUser(user);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites"
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile - Drinking buddie</title>
        <meta name="description" content="Manage your Drinking Buddy profile and preferences" />
      </Helmet>

      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Profile header */}
            <motion.div
              className="mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My Profile</h1>
              <p className="text-muted">Manage your profile, preferences, and favorites.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <motion.div
                className="lg:col-span-1"
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
              >
                <Card className="bg-secondary bg-opacity-30 border-0 shadow-md">
                  <CardHeader className="flex flex-col items-center space-y-4 pb-0">
                    <Avatar className="w-24 h-24 border-2 border-accent">
                      {user.profileImage ? (
                        <AvatarImage src={user.profileImage} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-primary text-white text-xl">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white">{user.fullName || user.name}</h2>
                      <p className="text-accent">@{user.name}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {!isEditing ? (
                      <>
                        <div className="space-y-4">
                          {user.email && (
                            <div className="flex items-center">
                              <FaEnvelope className="text-accent mr-3" />
                              <span className="text-muted">{user.email}</span>
                            </div>
                          )}
                          {user.age && (
                            <div className="flex items-center">
                              <FaCalendarAlt className="text-accent mr-3" />
                              <span className="text-muted">{user.age} years old</span>
                            </div>
                          )}
                          {user.gender && (
                            <div className="flex items-center">
                              <FaGenderless className="text-accent mr-3" />
                              <span className="text-muted">{user.gender}</span>
                            </div>
                          )}
                          {user.vibePref && (
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-accent mr-3" />
                              <span className="text-muted">{user.vibePref}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-white mb-4">Drink Preferences</h3>
                          <div className="flex flex-wrap gap-2">
                            {user.drinkPreferences?.map((drink, index) => (
                              <Badge key={index} variant="outline" className="bg-primary bg-opacity-20 text-accent">
                                <FaGlassMartini className="mr-1" /> {drink}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-white mb-4">Music Taste</h3>
                          <div className="flex flex-wrap gap-2">
                            {user.musicTaste?.map((genre, index) => (
                              <Badge key={index} variant="outline" className="bg-primary bg-opacity-20 text-accent">
                                <FaMusic className="mr-1" /> {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button onClick={handleEditProfile} className="w-full mt-8 bg-accent text-primary hover:bg-accent/90">
                          Edit Profile
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="text-white text-sm mb-1 block">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={editableUser?.fullName || ''}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-background border border-muted focus:border-accent focus:outline-none text-white"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm mb-1 block">Age</label>
                          <input
                            type="number"
                            name="age"
                            value={editableUser?.age || ''}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-background border border-muted focus:border-accent focus:outline-none text-white"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm mb-1 block">Gender</label>
                          <select
                            name="gender"
                            value={editableUser?.gender || ''}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-background border border-muted focus:border-accent focus:outline-none text-white"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-white text-sm mb-1 block">Vibe Preference</label>
                          <input
                            type="text"
                            name="vibePref"
                            value={editableUser?.vibePref || ''}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-background border border-muted focus:border-accent focus:outline-none text-white"
                          />
                        </div>

                        <div className="flex gap-4 mt-6">
                          <Button onClick={handleSaveProfile} className="flex-1 bg-accent text-primary hover:bg-accent/90">
                            Save Changes
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Favorites Section */}
              <motion.div
                className="lg:col-span-2"
                initial="hidden"
                animate="visible"
                variants={slideInRight}
              >
                <Card className="bg-secondary bg-opacity-30 border-0 shadow-md h-full">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-white">My Favorites</h2>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="clubs">
                      <TabsList className="mb-6">
                        <TabsTrigger value="clubs">Favorite Clubs</TabsTrigger>
                        <TabsTrigger value="events">Favorite Events</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="clubs" className="space-y-4">
                        {favorites.filter(item => item.type === 'club').length > 0 ? (
                          favorites
                            .filter(item => item.type === 'club')
                            .map(club => (
                              <div key={club.id} className="bg-background rounded-lg p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <img 
                                    src={club.image} 
                                    alt={club.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-white mb-1">{club.name}</h3>
                                    <Link href={`/clubs/${club.id}`} className="text-accent text-sm hover:underline">View details</Link>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-destructive hover:text-destructive/80"
                                    onClick={() => handleRemoveFavorite(club.id)}
                                  >
                                    <FaHeart className="mr-1" /> Remove
                                  </Button>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                              <FaHeart className="text-accent text-xl" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">No favorite clubs yet</h3>
                            <p className="text-muted mb-4">Explore and add clubs to your favorites</p>
                            <Link href="/clubs">
                              <Button className="bg-accent text-primary hover:bg-accent/90">
                                Explore Clubs
                              </Button>
                            </Link>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="events" className="space-y-4">
                        {favorites.filter(item => item.type === 'event').length > 0 ? (
                          favorites
                            .filter(item => item.type === 'event')
                            .map(event => (
                              <div key={event.id} className="bg-background rounded-lg p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <img 
                                    src={event.image} 
                                    alt={event.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-white mb-1">{event.name}</h3>
                                    {event.date && (
                                      <div className="flex items-center text-muted text-sm mb-2">
                                        <FaCalendarAlt className="mr-1" /> {event.date}
                                      </div>
                                    )}
                                    <Link href={`/events/${event.id}`} className="text-accent text-sm hover:underline">View details</Link>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-destructive hover:text-destructive/80"
                                    onClick={() => handleRemoveFavorite(event.id)}
                                  >
                                    <FaHeart className="mr-1" /> Remove
                                  </Button>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className="text-center py-12">
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
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;