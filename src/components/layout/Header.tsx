
import React, { useState } from 'react';
import { Bell, Menu, X, Search, User } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import UserProfile from '../ui-elements/UserProfile';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar, sidebarOpen }) => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  
  return (
    <header className="bg-background/70 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar} 
            className="transition-all-fast p-2 rounded-lg hover:bg-secondary text-foreground"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-medium text-xl hidden md:block">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-secondary border-none text-sm focus:ring-2 focus:ring-primary/20 transition-all-fast w-64"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-secondary transition-all-fast relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass shadow-elevated">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">New escalation from Team A</p>
                        <p className="text-muted-foreground text-xs">5 min ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setShowUserProfile(true)}
            className="flex items-center text-sm transition-all-fast p-1 rounded-lg hover:bg-secondary"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User size={16} />
            </div>
          </button>
        </div>
      </div>

      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}
    </header>
  );
};

export default Header;
