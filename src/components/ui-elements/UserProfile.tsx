
import React from 'react';
import { X, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    role: 'Relationship Manager',
    email: 'alex.johnson@company.com',
    avatar: null,
    team: 'Support Team A'
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div 
        className="w-full sm:w-[400px] bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-elevated animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-medium">Profile</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 rounded-full flex items-center justify-center bg-primary/10 text-primary">
              <User size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium">{userData.name}</h3>
              <p className="text-muted-foreground">{userData.role}</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team</p>
              <p>{userData.team}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <Settings size={16} className="mr-2" />
              Account Settings
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
