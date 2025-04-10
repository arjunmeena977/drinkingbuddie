import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '@/utils/animation';
import { FaGlassCheers, FaUserFriends, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - drinkingbuddie</title>
        <meta name="description" content="Learn more about Drinking Buddy, your ultimate nightlife companion. Discover our mission, vision, and the team behind the platform." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/80 to-secondary/80 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About drinkingbuddie</h1>
            <p className="text-lg text-muted-foreground">
              Your Ultimate Nightlife Companion: Connecting People, Places, and Parties
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our <span className="text-accent">Story</span></h2>
              <p className="text-muted mb-4">
                Drinking Buddy was born from a simple idea: nightlife should be accessible, exciting, and social 
                for everyone. Founded in 2022 by a group of friends who were tired of struggling to find the best 
                clubs and events in their city, we set out to create a platform that would revolutionize how people 
                experience nightlife.
              </p>
              <p className="text-muted mb-4">
                Our founders combined their expertise in technology, nightlife promotion, and social networking to 
                build a comprehensive solution that not only helps users discover the hottest venues and events but 
                also connects them with like-minded individuals to share those experiences with.
              </p>
              <p className="text-muted">
                Today, Drinking Buddy has grown into a vibrant community of nightlife enthusiasts, helping thousands of 
                people find their perfect night out and make meaningful connections along the way.
              </p>
            </motion.div>
            
            <motion.div
              className="relative h-96 rounded-xl overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80" 
                alt="Drinking Buddy Team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our <span className="text-accent">Mission</span></h2>
            <p className="text-lg text-muted max-w-3xl mx-auto">
              At Drinking Buddy, we're on a mission to transform how people experience nightlife by 
              creating meaningful connections between people, places, and events. We believe that 
              memorable nights out are about more than just great venues—they're about sharing 
              experiences with the right people.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div 
              className="bg-secondary bg-opacity-30 p-6 rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 mx-auto">
                <FaSearch className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Discover</h3>
              <p className="text-muted text-center">
                We help you find the best clubs, lounges, and venues that match your preferences and vibe.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary bg-opacity-30 p-6 rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 mx-auto">
                <FaUserFriends className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Connect</h3>
              <p className="text-muted text-center">
                We match you with drinking buddies who share your taste in music, drinks, and atmosphere.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary bg-opacity-30 p-6 rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 mx-auto">
                <FaCalendarAlt className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Experience</h3>
              <p className="text-muted text-center">
                We keep you updated on the hottest events and promotions happening at your favorite venues.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary bg-opacity-30 p-6 rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 mx-auto">
                <FaGlassCheers className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Celebrate</h3>
              <p className="text-muted text-center">
                We make every night out memorable with exclusive offers, VIP access, and curated experiences.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our <span className="text-accent">Values</span></h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-secondary bg-opacity-30 p-6 rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Community First</h3>
              <p className="text-muted">
                We believe in building a supportive, inclusive community where everyone feels welcome and valued.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary bg-opacity-30 p-6 rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Safety & Trust</h3>
              <p className="text-muted">
                We prioritize user safety and build trust through transparent practices and reliable information.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary bg-opacity-30 p-6 rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-muted">
                We constantly evolve our platform to provide the most cutting-edge nightlife experience.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
