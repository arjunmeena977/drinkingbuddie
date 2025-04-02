import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/utils/animation";
import ReviewCard from "@/components/review-card";

const reviews = [
  {
    name: "Jennifer S.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    comment: "I was new to the city and didn't know where to go. Thanks to Drinking Buddy, I found amazing clubs and met some great people who showed me around!",
    usagePeriod: "Used Drinking Buddy for 6 months"
  },
  {
    name: "Mark T.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    comment: "The drinking partner feature is genius! I met my current girlfriend through the app when we both wanted to check out a new jazz bar.",
    usagePeriod: "Used Drinking Buddy for 1 year"
  },
  {
    name: "Sophia L.",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    comment: "I love how Drinking Buddy shows me events based on my music taste. The VIP discounts at partner clubs have saved me so much money!",
    usagePeriod: "Used Drinking Buddy for 8 months"
  }
];

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#121212] to-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">What Our <span className="text-accent">Community Says</span></h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Hear from our users about their experiences with Drinking Buddy
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              image={review.image}
              rating={review.rating}
              comment={review.comment}
              usagePeriod={review.usagePeriod}
              index={index}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a href="#" className="inline-block text-accent hover:text-primary border-b-2 border-accent hover:border-primary transition-colors">
            Read More Reviews
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
