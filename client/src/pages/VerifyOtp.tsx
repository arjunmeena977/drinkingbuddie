// pages/verify-otp.tsx
import { useSearch, useLocation } from 'wouter';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const VerifyOtp = () => {
  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  const sessionId = new URLSearchParams(searchParams).get('session');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);

    if (!otp) {
      toast({
        title: 'Error',
        description: 'Please enter the OTP',
        variant: 'destructive'
      });
      return;
    } 

    
    try {
      const response = await fetch('http://localhost:8000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: sessionId,
          otp: otp
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'OTP verification failed');
      }

      toast({
        title: 'Success',
        description: 'OTP verified successfully! You can now sign in.'
      });

      setLocation('/signin');
    } catch (err) {
      toast({
        title: 'Verification Failed',
        description: err instanceof Error ? err.message : 'Invalid OTP',
        variant: 'destructive'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <Input
          placeholder="Enter the OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button className="w-full mt-4" onClick={handleVerify} disabled={isVerifying}>
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyOtp;
