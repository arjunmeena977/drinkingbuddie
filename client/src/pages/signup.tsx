import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animation';
import { FaGlassCheers, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const SignUp = () => {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    otp: '',
    agreedToTerms: false,
    agreedToAge: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setUserData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    // Validate form
    if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!userData.email && !userData.mobile) {
      toast({
        title: "Error",
        description: "Please provide either an email or mobile number",
        variant: "destructive"
      });
      return;
    }
    

    if (userData.password !== userData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!userData.agreedToTerms || !userData.agreedToAge) {
      toast({
        title: "Error",
        description: "You must agree to the terms and confirm you are of legal drinking age",
        variant: "destructive"
      });
      return;
    }


    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('password', userData.password);
      if (userData.email) formData.append('email', userData.email);
      if (userData.mobile) formData.append('mobile', userData.mobile);
      // If you are using picture upload later, add it here
      // if (userData.picture) formData.append('picture', userData.picture);
  
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        body: formData
      });
  
      console.log("response", response);
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to send OTP');
      }
  
      const { session_id } = await response.json();
  
      toast({
        title: "OTP Sent!",
        description: "Please verify the OTP to complete your registration"
      });
  
      setLocation(`/verify-otp?session=${session_id}`);
  
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unable to create account. Please try again.",
        variant: "destructive"
      });
      console.log("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Drinking Buddy</title>
        <meta name="description" content="Create your Drinking Buddy account to discover the best nightlife spots, connect with drinking partners, and receive personalized event recommendations." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-primary to-secondary relative">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1581974944026-5d6ed762f617?auto=format&fit=crop&w=1950&q=80"
              alt="Nightlife scene"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Join the Ultimate Nightlife Community</h2>
            <p className="text-xl text-white/80 max-w-lg">
              Create your profile, connect with like-minded party-goers, and discover the best nightlife experiences in your area.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
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
              <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
              <p className="text-muted">Join the community of nightlife enthusiasts</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">name</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-muted-foreground" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Choose a name"
                    className="pl-10 bg-secondary bg-opacity-30 border-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10 bg-secondary bg-opacity-30 border-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-muted-foreground" />
                  </div>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={userData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="pl-10 bg-secondary bg-opacity-30 border-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="pl-10 bg-secondary bg-opacity-30 border-primary"
                  />
                </div>
                <p className="text-xs text-muted mt-1">Minimum 8 characters with at least one number</p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-muted-foreground" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="pl-10 bg-secondary bg-opacity-30 border-primary"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Button onClick={() => window.location.href = "/api/auth/google/login"} className="w-full bg-white text-black flex items-center justify-center gap-2">
                  <img src="/google-icon.png" 
                  alt="Google" className="h-5 w-5" />
                  <a href="http://localhost:8000/auth/google">Sign in with Google</a>
                  

                </Button>
 
                <Button onClick={() => window.location.href = "/api/auth/instagram/login"} className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white flex items-center justify-center gap-2">
                  <img src="/instagram-icon.png" alt="Instagram" className="h-5 w-5" />
                  <a href="http://localhost:8000/auth/instagram/login">Sign in with Instagram</a>
                </Button>
              </div>

 
              <div className="space-y-3">
                <div className="flex items-start">
                  <Checkbox
                    id="agreedToTerms"
                    checked={userData.agreedToTerms}
                    onCheckedChange={(checked) => handleCheckboxChange('agreedToTerms', checked as boolean)}
                    className="mr-2 mt-1"
                  />
                  <Label htmlFor="agreedToTerms" className="text-sm">
                    I agree to the{' '}
                    <Link href="/terms" className="text-accent hover:underline">
                      Terms & Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start">
                  <Checkbox
                    id="agreedToAge"
                    checked={userData.agreedToAge}
                    onCheckedChange={(checked) => handleCheckboxChange('agreedToAge', checked as boolean)}
                    className="mr-2 mt-1"
                  />
                  <Label htmlFor="agreedToAge" className="text-sm">
                    I confirm that I am of legal drinking age in my country
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 bg-accent hover:bg-accent/90 text-primary font-semibold text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center mt-6">
                <p className="text-muted">
                  Already have an account? {' '}
                  <Link href="/signin" className="text-accent hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
