import { motion } from "framer-motion";
import { slideInLeft, slideInRight, fadeIn } from "@/utils/animation";
import { FaApple, FaGooglePlay, FaGlassCheers } from "react-icons/fa";

const AppSection = () => {
  return (
    <section className="py-16 bg-[#121212] relative overflow-hidden">
      <div className="absolute -right-64 top-1/2 transform -translate-y-1/2 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <h2 className="font-bold text-3xl md:text-4xl text-white mb-6">Take Drinking Buddy <span className="text-accent">Everywhere</span></h2>
            <p className="text-lg text-muted mb-8">
              Download our mobile app to find the best nightlife spots, connect with drinking buddies, and get exclusive deals - all on the go.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="flex items-center justify-center bg-white hover:bg-opacity-90 text-[#121212] px-6 py-3 rounded-xl transition-all">
                <FaApple className="text-2xl mr-3" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center justify-center bg-white hover:bg-opacity-90 text-[#121212] px-6 py-3 rounded-xl transition-all">
                <FaGooglePlay className="text-2xl mr-3" />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center md:justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
          >
            <div className="relative h-96 w-64">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Drinking Buddy Mobile App" 
                className="h-full w-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60 rounded-3xl"></div>
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                variants={fadeIn}
                transition={{ delay: 0.5 }}
              >
                <FaGlassCheers className="text-accent text-4xl mb-4 mx-auto" />
                <h3 className="font-bold text-xl text-white">Drinking Buddy</h3>
                <p className="text-muted mt-2 text-sm">Your mobile companion</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
