import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideUp } from "@/utils/animation";

interface ReviewCardProps {
  name: string;
  image: string;
  rating: number;
  comment: string;
  usagePeriod: string;
  index?: number;
}

const ReviewCard = ({ name, image, rating, comment, usagePeriod, index = 0 }: ReviewCardProps) => {
  return (
    <motion.div 
      className="bg-[#121212] p-6 rounded-xl shadow-lg"
      variants={slideUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={image}
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <div className="review-stars text-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < rating ? "inline" : "inline opacity-30"} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted italic mb-4">
        "{comment}"
      </p>
      <div className="text-sm text-accent">
        <i className="fas fa-quote-right"></i> {usagePeriod}
      </div>
    </motion.div>
  );
};

export default ReviewCard;
