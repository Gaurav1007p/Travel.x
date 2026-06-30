import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export function HeroHeader({ destination, onDestinationChange }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? '🌅 Rise & Wander' : hour < 18 ? '🌤️ Explore & Discover' : '🌙 Dream & Plan';

  return (
    <div className="relative mb-12 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 bg-gradient-orbs pointer-events-none" />
      
      {/* Hero Content */}
      <div className="relative z-10 pt-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
            Where to next?
          </h1>
          <p className="text-lg text-white/60 font-light">{greeting}</p>
        </div>

        {/* Boarding Pass Search */}
        <div className="max-w-2xl">
          <div className="relative group">
            {/* Glow Background */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-coral/50 via-neon-teal/50 to-neon-indigo/50 rounded-lg blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Compass className="w-8 h-8 text-neon-teal" />
                </div>

                {/* Input */}
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => onDestinationChange(e.target.value)}
                    placeholder="Enter your next adventure..."
                    className="w-full bg-transparent text-2xl font-display text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Action */}
                <button className="flex-shrink-0 p-3 bg-gradient-to-br from-neon-teal to-neon-teal/50 rounded-lg hover:shadow-neon-teal transition-all duration-300 group/btn">
                  <Sparkles className="w-6 h-6 text-luxury-dark group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>

              {/* Decorative Dashed Line */}
              <div className="mt-4 pt-4 border-t border-dashed border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                <span>✈️ TRAVELER</span>
                <span>PASSPORT</span>
                <span>🗺️ VOYAGE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
