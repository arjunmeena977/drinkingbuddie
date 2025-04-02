import { Link } from "wouter";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideUp, slideInLeft, slideInRight } from "@/utils/animation";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
          alt="Nightclub atmosphere" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="font-bold text-4xl md:text-6xl text-white mb-6 leading-tight"
            variants={slideInLeft}
          >
            Your Ultimate <span className="text-accent">Nightlife</span> Companion
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted mb-8 leading-relaxed"
            variants={slideInRight}
          >
            Discover the best clubs, connect with drinking partners, and never miss another epic night out. Your next unforgettable evening starts here.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={slideUp}
          >
            <Link href="/clubs">
              <a className="btn-primary px-8 py-3 text-lg inline-block text-center">
                Explore Top Clubs
              </a>
            </Link>
            <Link href="/partners">
              <a className="btn-secondary px-8 py-3 text-lg inline-block text-center">
                Find a Drinking Buddy
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a href="#featured" className="text-white hover:text-accent transition-colors">
          <FaChevronDown className="text-2xl" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
