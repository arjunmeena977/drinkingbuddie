import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '@/utils/animation';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond shortly!",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Drinking Buddy</title>
        <meta name="description" content="Get in touch with the Drinking Buddy team. We're here to answer your questions and hear your feedback." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/80 to-secondary/80 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Reach out to our team with any questions, feedback, or partnership inquiries.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Get in <span className="text-accent">Touch</span></h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="bg-secondary bg-opacity-30 border-primary mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="bg-secondary bg-opacity-30 border-primary mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="bg-secondary bg-opacity-30 border-primary mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Your Message <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className="bg-secondary bg-opacity-30 border-primary mt-2 min-h-[150px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary py-6" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="lg:pl-8"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Contact <span className="text-accent">Information</span></h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                    <FaEnvelope className="text-accent text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                    <p className="text-muted mb-1">General Inquiries: info@drinkingbuddie.com</p>
                    <p className="text-muted mb-1">Support: support@drinkingbuddie.com</p>
                    <p className="text-muted">Partnerships: partners@drinkingbuddie.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                    <FaPhone className="text-accent text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                    <p className="text-muted mb-1">Customer Service: +1 (555) 123-4567</p>
                    <p className="text-muted">Hours: Monday-Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                    <FaMapMarkerAlt className="text-accent text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                    <p className="text-muted mb-1">Drinking Buddy Headquarters</p>
                    <p className="text-muted">123 Nightlife Avenue</p>
                    <p className="text-muted">New York, NY 10001</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-secondary bg-opacity-30 flex items-center justify-center hover:bg-primary transition-colors">
                    <FaFacebookF className="text-accent text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-secondary bg-opacity-30 flex items-center justify-center hover:bg-primary transition-colors">
                    <FaInstagram className="text-accent text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-secondary bg-opacity-30 flex items-center justify-center hover:bg-primary transition-colors">
                    <FaTwitter className="text-accent text-xl" />
                  </a>
                </div>
              </div>
              
              <div className="mt-12 bg-secondary bg-opacity-30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Join Our Team</h3>
                <p className="text-muted mb-4">
                  Interested in being part of the Drinking Buddy revolution? We're always looking for passionate 
                  individuals to join our team.
                </p>
                <a href="#" className="text-accent hover:text-white transition-colors font-medium">
                  View Open Positions →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
