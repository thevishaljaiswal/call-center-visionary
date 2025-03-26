
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  HelpCircle,
  Radio
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

type UserRole = 'rm' | 'tl' | 'hod';

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<UserRole>('rm');
  
  const navigationItems = [
    {
      name: 'Relationship Manager',
      path: '/rm-dashboard',
      icon: <Phone size={20} />,
      role: 'rm'
    },
    {
      name: 'Team Lead',
      path: '/tl-dashboard',
      icon: <Users size={20} />,
      role: 'tl'
    },
    {
      name: 'Head of Department',
      path: '/hod-dashboard',
      icon: <BarChart3 size={20} />,
      role: 'hod'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
      role: 'all'
    }
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside 
      className={`
        bg-sidebar border-r border-border transition-all-medium flex flex-col
        ${isOpen ? 'w-64' : 'w-20'} h-screen sticky top-0 z-50
      `}
    >
      <div className="p-6 flex items-center justify-center">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <Radio size={20} />
          </div>
          {isOpen && (
            <span className="font-semibold text-xl transition-opacity duration-300">CallVision</span>
          )}
        </Link>
      </div>
      
      <div className="flex-1 py-8">
        <nav className="space-y-1 px-3">
          {navigationItems.map((item) => (
            ((item.role === userRole || item.role === 'all')) && (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-3 py-3 rounded-lg transition-all-fast
                  ${isActiveLink(item.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }
                `}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {isOpen && (
                  <span className="ml-3 font-medium transition-opacity duration-300">{item.name}</span>
                )}
              </Link>
            )
          ))}
        </nav>
      </div>
      
      <div className="p-6 border-t border-border">
        <div className="space-y-1">
          <div 
            className="flex items-center px-3 py-2 text-muted-foreground cursor-pointer hover:text-foreground transition-all-fast"
          >
            <HelpCircle size={20} />
            {isOpen && <span className="ml-3">Help</span>}
          </div>
          <div 
            className="flex items-center px-3 py-2 text-muted-foreground cursor-pointer hover:text-foreground transition-all-fast"
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-3">Logout</span>}
          </div>
        </div>
        
        {isOpen && (
          <div className="mt-6">
            <div className="bg-sidebar-accent p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Current Role</p>
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="w-full bg-transparent border-none text-sm font-medium focus:ring-0"
              >
                <option value="rm">Relationship Manager</option>
                <option value="tl">Team Lead</option>
                <option value="hod">Head of Department</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
