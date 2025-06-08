
import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Lock, User, Mail } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check secret code
    if (secretCode.toLowerCase() !== 'muraya') {
      toast({
        title: "Invalid Access Code",
        description: "Please enter the correct access code to register.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate signup process (you can integrate with your auth system)
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Your admin account has been created. Please contact the administrator to activate your account.",
      });
      setIsLoading(false);
      onSwitchToLogin();
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md bg-[#161b22] border-[#30363d]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <UserPlus className="w-6 h-6" />
          Admin Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#c9d1d9]">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#7d8590]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-[#c9d1d9]">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                className="pl-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#7d8590]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-[#c9d1d9]">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
                className="pl-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#7d8590]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secret-code" className="text-[#c9d1d9]">Access Code</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
              <Input
                id="secret-code"
                type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Enter access code"
                className="pl-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#7d8590]"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Admin Account'}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
