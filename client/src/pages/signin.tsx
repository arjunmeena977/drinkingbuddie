import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animation';
import { FaGlassCheers, FaLock, FaEnvelope } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const SignIn = () => {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setCredentials(prev => ({ ...prev, rememberMe: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!credentials.username || !credentials.password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Attempt login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sign in');
      }
      
      // Success
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in"
      });
      
      // Redirect to home after successful login
      setLocation('/');
      
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Invalid username or password",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Drinking Buddy</title>
        <meta name="description" content="Sign in to your Drinking Buddy account to access personalized nightlife recommendations and connect with drinking partners." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        {/* Left side - Form */}
        <motion.div 
          className="md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <FaGlassCheers className="text-accent text-3xl mr-2" />
                <span className="font-bold text-2xl text-white">Drinking<span className="text-accent">Buddy</span></span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
              <p className="text-muted">Sign in to your account to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-muted-foreground" />
                  </div>
                  <Input 
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="pl-10 bg-secondary bg-opacity-30 border-primary"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-muted-foreground" />
                  </div>
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 bg-secondary bg-opacity-30 border-primary"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="rememberMe" 
                  checked={credentials.rememberMe}
                  onCheckedChange={handleCheckboxChange} 
                  className="mr-2"
                />
                <Label htmlFor="rememberMe" className="text-sm cursor-pointer">Remember me</Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-accent hover:bg-accent/90 text-primary font-semibold text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-6">
                <p className="text-muted">
                  Don't have an account? {' '}
                  <Link href="/signup" className="text-accent hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
        
        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-primary to-secondary relative">
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1950&q=80"
              alt="Nightclub scene" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Your Ultimate Nightlife Experience Awaits</h2>
            <p className="text-xl text-white/80 max-w-lg">
              Connect with drinking buddies, discover the hottest clubs, and never miss another epic night out.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
