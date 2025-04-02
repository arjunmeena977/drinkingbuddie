import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/utils/animation";
import { FaArrowRight } from "react-icons/fa";
import EventCard from "@/components/event-card";
import { Event } from "@shared/schema";
import { Button } from "@/components/ui/button";

const EventsSection = () => {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/upcoming/3'],
  });

  return (
    <section id="events" className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex justify-between items-center mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h2 className="font-bold text-3xl md:text-4xl text-white mb-2">Upcoming <span className="text-accent">Events</span></h2>
            <p className="text-lg text-muted">The hottest parties and gatherings you don't want to miss</p>
          </div>
          <Link href="/events" className="hidden md:flex items-center text-accent hover:text-primary transition-colors">
            <span className="font-semibold">View All Events</span>
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-secondary bg-opacity-30 rounded-xl shadow-lg h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {events?.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-center mt-10 md:hidden"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/events">
            <Button className="btn-primary px-8 py-3 text-lg flex items-center gap-2">
              View All Events
              <FaArrowRight />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
