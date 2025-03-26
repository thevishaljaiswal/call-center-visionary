
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Users, BarChart3, Radio } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const dashboards = [
    {
      title: 'Relationship Manager',
      description: 'Access calls, customer data, and performance metrics.',
      icon: <Phone size={24} />,
      path: '/rm-dashboard',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Team Lead',
      description: 'Monitor team performance and manage agents.',
      icon: <Users size={24} />,
      path: '/tl-dashboard',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Head of Department',
      description: 'View high-level analytics and departmental KPIs.',
      icon: <BarChart3 size={24} />,
      path: '/hod-dashboard',
      color: 'from-emerald-400 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40">
      {isLoading ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 animate-pulse">
            <Radio size={32} className="animate-float" />
          </div>
          <h1 className="text-3xl font-medium mb-2 animate-pulse">CallVision</h1>
          <p className="text-muted-foreground animate-pulse">Loading your experience...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white">
                <Radio size={28} />
              </div>
            </div>
            <h1 className="text-5xl font-medium mb-6">Welcome to CallVision</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The intelligent call center dashboard that helps you monitor, analyze, and optimize your customer service operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {dashboards.map((dashboard, index) => (
              <div 
                key={index}
                className="card-glass hover:shadow-elevated transition-all-medium cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => navigate(dashboard.path)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dashboard.color} flex items-center justify-center text-white mb-4`}>
                  {dashboard.icon}
                </div>
                <h2 className="text-xl font-medium mb-2">{dashboard.title}</h2>
                <p className="text-muted-foreground mb-4">{dashboard.description}</p>
                <div className="flex justify-end">
                  <button 
                    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${dashboard.color} text-white text-sm font-medium transition-transform hover:translate-y-[-2px]`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(dashboard.path);
                    }}
                  >
                    Access Dashboard
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center text-muted-foreground animate-fade-in">
            <p>CallVision - Elevating Your Call Center Experience</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
