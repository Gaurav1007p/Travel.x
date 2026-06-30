import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

const CATS = {
  stay: { emoji: "🏨", label: "Stay", color: 'from-blue-500/30 to-blue-600/30', accent: 'text-blue-300', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' },
  dining: { emoji: "🍕", label: "Dining", color: 'from-amber-500/30 to-amber-600/30', accent: 'text-amber-300', glow: 'shadow-[0_0_15px_rgba(217,119,6,0.2)]' },
  sightseeing: { emoji: "🏛️", label: "Sightseeing", color: 'from-emerald-500/30 to-emerald-600/30', accent: 'text-emerald-300', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
  transport: { emoji: "✈️", label: "Transport", color: 'from-purple-500/30 to-purple-600/30', accent: 'text-purple-300', glow: 'shadow-[0_0_15px_rgba(147,51,234,0.2)]' }
};

export function PremiumActivityCard({ activity, onDelete }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: activity.id,
  });

  const cat = CATS[activity.cat] || CATS.sightseeing;
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`relative group cursor-grab active:cursor-grabbing transition-all duration-300 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'
      }`}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${cat.color} rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cat.glow}`} />
      
      {/* Card */}
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 overflow-hidden">
        {/* Time Badge - Overlapping */}
        <div className="absolute -top-4 -right-4 bg-gradient-to-br from-neon-teal to-neon-teal/50 px-4 py-2 rounded-full font-mono text-sm font-bold text-luxury-dark rotate-12 shadow-lg">
          {timeStr}
        </div>

        {/* Content */}
        <div className="pr-12">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-lg">{cat.emoji}</span>
            <span className={`text-xs font-semibold ${cat.accent}`}>{cat.label}</span>
          </div>

          {/* Title */}
          <h4 className="text-white font-display font-semibold text-sm mb-2 line-clamp-2">
            {activity.title}
          </h4>

          {/* Cost */}
          <div className="text-neon-teal font-mono font-bold text-lg">
            ${Math.round(activity.cost).toLocaleString()}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(activity.id)}
          className="absolute top-3 right-3 p-2 opacity-0 group-hover:opacity-100 bg-neon-coral/20 hover:bg-neon-coral/40 border border-neon-coral/30 rounded-lg transition-all duration-200"
          title="Delete activity"
        >
          <Trash2 className="w-4 h-4 text-neon-coral" />
        </button>
      </div>
    </div>
  );
}
