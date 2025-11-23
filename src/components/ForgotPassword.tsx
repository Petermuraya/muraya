import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft } from 'lucide-react';
import { requestPasswordReset } from '@/services/authService';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await requestPasswordReset(email);

    if (response.success) {
      setIsSubmitted(true);
      toast({
        title: "Email Sent",
        description: response.message,
      });
    } else {
      toast({
        title: "Error",
        description: response.error || response.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md bg-[#161b22] border-[#30363d]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Check Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-center">
            <Mail className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <p className="text-[#c9d1d9] text-sm">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-[#7d8590] text-xs mt-2">
              The link will expire in 24 hours.
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-[#7d8590] text-sm">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Try Another Email
            </Button>
            
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full border-[#30363d] text-[#c9d1d9] hover:bg-[#0d1117]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-[#161b22] border-[#30363d]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Mail className="w-6 h-6" />
          Reset Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 mb-4">
            <p className="text-[#7d8590] text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-[#c9d1d9]">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                className="pl-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#7d8590]"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <Button 
            type="button"
            onClick={onBack}
            variant="outline"
            className="w-full border-[#30363d] text-[#c9d1d9] hover:bg-[#0d1117]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
