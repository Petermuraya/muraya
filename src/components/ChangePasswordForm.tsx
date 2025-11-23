import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { changePassword } from '@/services/authService';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      });
      return;
    }

    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    if (currentPassword === newPassword) {
      toast({
        title: "Error",
        description: "New password must be different from current password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const response = await changePassword(currentPassword, newPassword);

    if (response.success) {
      toast({
        title: "Success",
        description: response.message,
      });

      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast({
        title: "Error",
        description: response.error || response.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const PasswordInput = ({ 
    id, 
    label, 
    value, 
    onChange, 
    show, 
    onToggleShow, 
    placeholder 
  }: {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    show: boolean;
    onToggleShow: () => void;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[#c9d1d9]">{label}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-[#7d8590]" />
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#7d8590]"
          required
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-3 text-[#7d8590] hover:text-[#c9d1d9]"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <Card className="w-full bg-[#161b22] border-[#30363d]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            id="current-password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            show={showCurrentPassword}
            onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
            placeholder="Enter current password"
          />

          <PasswordInput
            id="new-password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            show={showNewPassword}
            onToggleShow={() => setShowNewPassword(!showNewPassword)}
            placeholder="Enter new password"
          />

          <PasswordInput
            id="confirm-password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            show={showConfirmPassword}
            onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            placeholder="Confirm new password"
          />

          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
            <p className="text-[#7d8590] text-sm">
              <strong>Password requirements:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>At least 8 characters long</li>
                <li>Different from current password</li>
              </ul>
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              className="flex-1 border-[#30363d] text-[#c9d1d9] hover:bg-[#0d1117]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
