import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

export function PassportWidget({ destination, numDays, budget, spent, currency }) {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  const daysRemaining = numDays - 1;

  return (
    <div className="relative group h-full">
      {/* Glow Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-coral/30 via-neon-teal/30 to-neon-indigo/30 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between hover:bg-white/[0.08] transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Digital Passport</p>
            <h3 className="text-2xl font-display font-bold text-white">{destination}</h3>
          </div>
          <div className="text-3xl">✈️</div>
        </div>

        {/* Trip Info Grid */}
        <div className="space-y-4 mb-6">
          {/* Duration */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-neon-teal" />
            </div>
            <div>
              <p className="text-xs text-white/50">Duration</p>
              <p className="text-white font-mono font-semibold">{numDays} days • {daysRemaining} remaining</p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <DollarSign className="w-5 h-5 text-neon-coral" />
            </div>
            <div>
              <p className="text-xs text-white/50">Budget</p>
              <p className="text-white font-mono font-semibold">{currency.sym}{Math.round(budget).toLocaleString()}</p>
            </div>
          </div>

          {/* Spent */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <MapPin className="w-5 h-5 text-neon-indigo" />
            </div>
            <div>
              <p className="text-xs text-white/50">Spent</p>
              <p className="text-white font-mono font-semibold">{currency.sym}{Math.round(spent).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Budget Ring - Circular Progress */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-3">
            <p className="text-xs text-white/50 uppercase tracking-widest">Budget Utilization</p>
            <p className="text-sm font-mono font-bold text-neon-teal">{Math.round(percentage)}%</p>
          </div>

          {/* Circular Progress */}
          <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage > 80 ? 'bg-gradient-to-r from-neon-coral to-neon-coral/50' :
                percentage > 50 ? 'bg-gradient-to-r from-neon-peach to-neon-peach/50' :
                'bg-gradient-to-r from-neon-teal to-neon-teal/50'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-white/50 mt-2">
            {currency.sym}{Math.round(budget - spent).toLocaleString()} remaining
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-4 pt-4 border-t border-dashed border-white/10 text-center">
          <p className="text-xs text-white/30 font-mono tracking-wider">VALID FOR ADVENTURE</p>
        </div>
      </div>
    </div>
  );
}
