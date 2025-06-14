
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Edit, Save, X, Quote } from 'lucide-react';
import SocialLinksManager from './SocialLinksManager';
import ProfileStats from './ProfileStats';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  bio: string;
  profession: string;
  profilePicture: string;
  activityStatus: 'online' | 'busy' | 'offline';
  joinDate: string;
  lastActive: string;
}

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfileData>({
    id: '1',
    name: 'Peter Muraya Ndungu',
    email: 'sammypeter1944@gmail.com',
    bio: 'AI & IoT Developer passionate about creating intelligent systems for African markets. Building the future with cutting-edge technology.',
    profession: 'Senior IoT & AI Developer',
    profilePicture: '',
    activityStatus: 'online',
    joinDate: '2024-01-15',
    lastActive: new Date().toISOString(),
  });
  const [editedProfile, setEditedProfile] = useState<UserProfileData>(profile);
  const [dailyQuote, setDailyQuote] = useState({
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  });

  useEffect(() => {
    // Load profile from localStorage or API
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditedProfile(parsed);
    }
    
    // Generate daily quote
    generateDailyQuote();
  }, []);

  const generateDailyQuote = () => {
    const quotes = [
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
      { text: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates" },
      { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" }
    ];
    
    const today = new Date().toDateString();
    const savedQuote = localStorage.getItem(`dailyQuote_${today}`);
    
    if (savedQuote) {
      setDailyQuote(JSON.parse(savedQuote));
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setDailyQuote(randomQuote);
      localStorage.setItem(`dailyQuote_${today}`, JSON.stringify(randomQuote));
    }
  };

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Daily Quote */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white italic">
                "{dailyQuote.text}"
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                — {dailyQuote.author}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Profile Card */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>User Profile</span>
            </CardTitle>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.profilePicture} />
                <AvatarFallback className="text-2xl">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(profile.activityStatus)}`}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {isEditing ? (
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="text-2xl font-bold"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                )}
                <Badge variant="secondary" className="capitalize">
                  {profile.activityStatus}
                </Badge>
              </div>
              
              {isEditing ? (
                <Input
                  value={editedProfile.profession}
                  onChange={(e) => setEditedProfile({...editedProfile, profession: e.target.value})}
                  placeholder="Your profession"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 font-medium">{profile.profession}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activity Status
                </label>
                {isEditing ? (
                  <Select
                    value={editedProfile.activityStatus}
                    onValueChange={(value: 'online' | 'busy' | 'offline') => 
                      setEditedProfile({...editedProfile, activityStatus: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className="capitalize">{profile.activityStatus}</Badge>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              {isEditing ? (
                <Textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <SocialLinksManager />

      {/* Profile Stats */}
      <ProfileStats />
    </div>
  );
};

export default UserProfile;
