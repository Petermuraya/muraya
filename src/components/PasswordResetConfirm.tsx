import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { updatePassword, verifyPasswordResetSession } from '@/services/authService';

const PasswordResetConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify the password reset session
    verifyPasswordResetSession().then((valid) => {
      setIsValid(valid);
      setIsVerifying(false);
      if (!valid) {
        toast({
          title: "Invalid Link",
          description: "This password reset link is invalid or has expired.",
          variant: "destructive",
        });
      }
    });
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const response = await updatePassword(newPassword);

    if (response.success) {
      setResetSuccess(true);
      toast({
        title: "Success",
        description: response.message,
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/admin');
      }, 3000);
    } else {
      toast({
        title: "Error",
        description: response.error || response.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin mb-4">
                <Lock className="w-8 h-8 text-blue-500 mx-auto" />
              </div>
              <p className="text-[#c9d1d9]">Verifying reset link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-[#161b22] border-[#30363d]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-500 flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Invalid Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#c9d1d9] text-center">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Button 
              onClick={() => navigate('/admin')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-[#161b22] border-[#30363d]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-500 flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Password Reset
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-center">
              <p className="text-[#c9d1d9]">
                Your password has been reset successfully!
              </p>
              <p className="text-[#7d8590] text-sm mt-2">
                Redirecting to login page...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#161b22] border-[#30363d]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Lock className="w-6 h-6" />
            Set New Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 mb-4">
              <p className="text-[#7d8590] text-sm">
                Please enter your new password. It must be at least 8 characters long.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-[#c9d1d9]">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="pl-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#7d8590]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#c9d1d9]">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
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
              {isLoading ? 'Updating Password...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetConfirm;
