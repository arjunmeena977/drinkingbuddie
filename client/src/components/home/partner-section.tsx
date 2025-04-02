import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/utils/animation";
import { User } from "@shared/schema";
import PartnerCard from "@/components/partner-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PartnerSection = () => {
  const [lookingFor, setLookingFor] = useState("Anyone");
  const [minAge, setMinAge] = useState("21");
  const [maxAge, setMaxAge] = useState("45");
  const [drinkPrefs, setDrinkPrefs] = useState<string[]>([]);
  const [musicTaste, setMusicTaste] = useState("All genres");
  const [vibePref, setVibePref] = useState("Energetic dance clubs");
  
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['/api/partners'],
  });
  
  const filteredUsers = users?.slice(0, 4);
  
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

  return (
    <section id="partners" className="py-16 bg-gradient-to-b from-[#121212] to-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">Find Your <span className="text-accent">Drinking Buddy</span></h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Connect with like-minded individuals who share your nightlife preferences
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-1 bg-secondary bg-opacity-40 p-6 rounded-xl shadow-lg"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-2xl text-white mb-6">Match Preferences</h3>
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
          
          <div className="lg:col-span-2">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-2xl text-white mb-6">Available Tonight <span className="text-accent text-lg">(8 potential matches)</span></h3>
            </motion.div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-secondary bg-opacity-30 rounded-xl shadow-lg h-40 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {filteredUsers?.map((user, index) => (
                  <PartnerCard key={user.id} partner={user} index={index} />
                ))}
              </motion.div>
            )}
            
            <motion.div 
              className="flex justify-center mt-8"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105">
                View More Matches
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
