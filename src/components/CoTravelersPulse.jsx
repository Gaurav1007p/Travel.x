import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

const mockTravelers = [
  { id: 1, name: 'Alex', avatar: 'A', online: true, color: 'from-neon-teal to-neon-teal/50' },
  { id: 2, name: 'Jordan', avatar: 'J', online: true, color: 'from-neon-coral to-neon-coral/50' },
  { id: 3, name: 'Casey', avatar: 'C', online: false, color: 'from-neon-indigo to-neon-indigo/50' },
  { id: 4, name: 'Riley', avatar: 'R', online: true, color: 'from-neon-peach to-neon-peach/50' },
];

export function CoTravelersPulse() {
  const [travelers, setTravelers] = useState(mockTravelers);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % travelers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [travelers.length]);

  const onlineCount = travelers.filter(t => t.online).length;

  return (
    <div className="relative group h-full">
      {/* Glow Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-indigo/30 via-neon-coral/30 to-neon-teal/30 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between hover:bg-white/[0.08] transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            <Users className="w-5 h-5 text-neon-indigo" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Co-Travelers</p>
            <p className="text-sm text-white font-semibold">{onlineCount} Active</p>
          </div>
        </div>

        {/* Avatar Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Center Pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-indigo/40 to-neon-indigo/20 rounded-full border border-neon-indigo/50 flex items-center justify-center">
                <div className="w-3 h-3 bg-neon-indigo rounded-full animate-pulse" />
              </div>
            </div>

            {/* Orbiting Avatars */}
            {travelers.map((traveler, idx) => {
              const angle = (idx / travelers.length) * 360;
              const isActive = idx === pulseIndex;
              const distance = 60;
              const x = distance * Math.cos((angle * Math.PI) / 180);
              const y = distance * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={traveler.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {/* Orbital Path */}
                  {idx === 0 && (
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none opacity-30"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#orbitGradient)"
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                      />
                      <defs>
                        <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00F2FE" />
                          <stop offset="100%" stopColor="#B366FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  {/* Avatar Bubble */}
                  <div className={`relative group/avatar transition-all duration-300 ${isActive ? 'scale-125' : 'hover:scale-110'}`}>
                    {/* Glow Effect */}
                    {traveler.online && (
                      <div
                        className={`absolute -inset-2 bg-gradient-to-r ${traveler.color} rounded-full blur-md opacity-0 group-hover/avatar:opacity-60 transition-opacity duration-300`}
                      />
                    )}

                    {/* Avatar Circle */}
                    <div
                      className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${traveler.color} border-2 ${
                        traveler.online ? 'border-white' : 'border-white/30'
                      } flex items-center justify-center font-display font-bold text-white text-sm shadow-lg transition-all duration-300 ${
                        isActive ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-luxury-dark' : ''
                      }`}
                    >
                      {traveler.avatar}
                    </div>

                    {/* Online Indicator */}
                    {traveler.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-teal rounded-full border border-luxury-dark shadow-lg animate-pulse" />
                    )}

                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      <div className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-xs text-white/80">
                        {traveler.name}
                        <span className={`ml-2 ${traveler.online ? 'text-neon-teal' : 'text-white/40'}`}>
                          {traveler.online ? '● Online' : '● Away'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/50 mb-2">Collaboration Status</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse" />
            <p className="text-xs text-white/70 font-mono">Real-time Sync Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
