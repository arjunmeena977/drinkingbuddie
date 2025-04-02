import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/animation';
import { User } from '@shared/schema';
import PartnerCard from '@/components/partner-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaFilter, FaUsers, FaUserFriends, FaUserCheck } from 'react-icons/fa';

const Partners = () => {
  const [lookingFor, setLookingFor] = useState("Anyone");
  const [minAge, setMinAge] = useState("21");
  const [maxAge, setMaxAge] = useState("45");
  const [drinkPrefs, setDrinkPrefs] = useState<string[]>([]);
  const [musicTaste, setMusicTaste] = useState("All genres");
  const [vibePref, setVibePref] = useState("Energetic dance clubs");
  const [activeTab, setActiveTab] = useState('available');
  
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['/api/partners'],
  });
  
  const handleDrinkPrefChange = (pref: string) => {
    setDrinkPrefs(prev => 
      prev.includes(pref) 
        ? prev.filter(p => p !== pref) 
        : [...prev, pref]
    );
  };
  
  const handleFindMatches = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would filter users based on preferences
    console.log("Finding matches with preferences:", {
      lookingFor,
      ageRange: { min: minAge, max: maxAge },
      drinkPrefs,
      musicTaste,
      vibePref
    });
  };

  // Filter users based on active tab and preferences
  const filteredUsers = users?.filter(user => {
    // In a real app, we would have more sophisticated filtering
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Find a Drinking Buddy - Drinking Buddy</title>
        <meta name="description" content="Connect with like-minded individuals who share your nightlife preferences. Find the perfect drinking partner for your next night out." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/80 to-secondary/80 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Find Your Drinking Buddy</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with like-minded people who share your taste in drinks, music, and venues. Never party alone again.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div 
              className="lg:col-span-1 bg-secondary bg-opacity-40 p-6 rounded-xl shadow-lg"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-2xl text-white">Match Preferences</h3>
                <FaFilter className="text-accent" />
              </div>
              <form className="space-y-5" onSubmit={handleFindMatches}>
                <div>
                  <Label className="block text-muted mb-2">I'm looking for</Label>
                  <Select value={lookingFor} onValueChange={setLookingFor}>
                    <SelectTrigger className="w-full bg-[#121212] border border-primary text-white">
                      <SelectValue placeholder="Anyone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Anyone">Anyone</SelectItem>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                      <SelectItem value="Non-binary">Non-binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-muted mb-2">Age Range</Label>
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      min="18"
                      max="100"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                      className="w-full bg-[#121212] border border-primary text-white"
                    />
                    <span className="text-muted">to</span>
                    <Input 
                      type="number" 
                      placeholder="Max"
                      min="18"
                      max="100"
                      value={maxAge}
                      onChange={(e) => setMaxAge(e.target.value)}
                      className="w-full bg-[#121212] border border-primary text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block text-muted mb-2">Drink Preferences</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Beer", "Wine", "Cocktails", "Shots"].map(pref => (
                      <label 
                        key={pref}
                        className="flex items-center bg-[#121212] p-2 rounded-lg cursor-pointer hover:bg-opacity-80"
                      >
                        <Checkbox 
                          checked={drinkPrefs.includes(pref)}
                          onCheckedChange={() => handleDrinkPrefChange(pref)}
                          className="mr-2"
                        />
                        <span className="text-muted">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="block text-muted mb-2">Music Taste</Label>
                  <Select value={musicTaste} onValueChange={setMusicTaste}>
                    <SelectTrigger className="w-full bg-[#121212] border border-primary text-white">
                      <SelectValue placeholder="All genres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All genres">All genres</SelectItem>
                      <SelectItem value="Electronic/EDM">Electronic/EDM</SelectItem>
                      <SelectItem value="Hip Hop/R&B">Hip Hop/R&B</SelectItem>
                      <SelectItem value="Rock/Alternative">Rock/Alternative</SelectItem>
                      <SelectItem value="Latin/Reggaeton">Latin/Reggaeton</SelectItem>
                      <SelectItem value="Pop/Top 40">Pop/Top 40</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-muted mb-2">Vibe Preference</Label>
                  <Select value={vibePref} onValueChange={setVibePref}>
                    <SelectTrigger className="w-full bg-[#121212] border border-primary text-white">
                      <SelectValue placeholder="Energetic dance clubs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Energetic dance clubs">Energetic dance clubs</SelectItem>
                      <SelectItem value="Relaxed lounges">Relaxed lounges</SelectItem>
                      <SelectItem value="Dive bars">Dive bars</SelectItem>
                      <SelectItem value="Upscale venues">Upscale venues</SelectItem>
                      <SelectItem value="Live music spots">Live music spots</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full btn-primary px-6 py-3 mt-4">
                  Find Matches
                </Button>
              </form>
            </motion.div>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="available" className="mb-10" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 max-w-lg mx-auto">
                  <TabsTrigger value="available" className="flex items-center gap-2">
                    <FaUsers /> Available Tonight
                  </TabsTrigger>
                  <TabsTrigger value="nearby" className="flex items-center gap-2">
                    <FaUserFriends /> Nearby
                  </TabsTrigger>
                  <TabsTrigger value="matches" className="flex items-center gap-2">
                    <FaUserCheck /> Best Matches
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-secondary bg-opacity-30 rounded-xl shadow-lg h-40 animate-pulse"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <p className="text-xl text-destructive">Failed to load potential buddies. Please try again later.</p>
                </div>
              ) : filteredUsers?.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xl text-muted">No drinking buddies found matching your preferences. Try adjusting your filters.</p>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredUsers?.map((user, index) => (
                    <PartnerCard key={user.id} partner={user} index={index} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
