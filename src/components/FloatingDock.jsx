import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Calendar, PieChart, Compass, Settings } from 'lucide-react';

export function FloatingDock() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Compass, label: 'Dashboard', color: 'text-neon-teal' },
    { path: '/timeline', icon: Calendar, label: 'Timeline', color: 'text-neon-coral' },
    { path: '/budget', icon: PieChart, label: 'Budget', color: 'text-neon-indigo' },
    { path: '/', icon: Map, label: 'Discover', color: 'text-neon-peach' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      {/* Dock Background Glow */}
      <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-neon-coral/10 via-neon-teal/10 to-neon-indigo/10 rounded-full scale-150" />
      
      {/* Dock Container */}
      <div className="relative flex items-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group p-3 rounded-full transition-all duration-300 ${
                active 
                  ? `bg-gradient-to-br from-${item.color === 'text-neon-teal' ? 'neon-teal' : item.color === 'text-neon-coral' ? 'neon-coral' : 'neon-indigo'}/20 to-transparent` 
                  : 'hover:bg-white/10'
              }`}
            >
              {/* Glow Effect on Active */}
              {active && (
                <div className={`absolute inset-0 rounded-full blur-lg ${
                  item.color === 'text-neon-teal' ? 'bg-neon-teal/20' :
                  item.color === 'text-neon-coral' ? 'bg-neon-coral/20' :
                  'bg-neon-indigo/20'
                } -z-10`} />
              )}
              
              <Icon className={`w-6 h-6 ${active ? item.color : 'text-white/60'} transition-colors duration-300`} />
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-xs text-white/80 whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
