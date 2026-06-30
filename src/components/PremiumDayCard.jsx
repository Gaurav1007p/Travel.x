import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { PremiumActivityCard } from './PremiumActivityCard';

export function PremiumDayCard({ day, activities, onDeleteActivity, staggerIndex }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-${day}`,
  });

  const dayNum = parseInt(day.split(' ')[1]);
  const stagger = staggerIndex % 2 === 0 ? 'translate-y-0' : 'translate-y-8';

  const totalCost = activities.reduce((acc, act) => acc + Number(act.cost || 0), 0);

  return (
    <div
      ref={setNodeRef}
      className={`group transition-all duration-300 ${stagger}`}
    >
      {/* Glow on Hover/Drag Over */}
      {isOver && (
        <div className="absolute -inset-2 bg-gradient-to-r from-neon-teal/30 to-neon-indigo/30 rounded-2xl blur-lg -z-10" />
      )}

      {/* Card */}
      <div
        className={`relative bg-white/5 backdrop-blur-md border-2 rounded-2xl p-6 transition-all duration-300 ${
          isOver
            ? 'border-neon-teal/50 bg-white/10 shadow-[0_0_30px_rgba(0,242,254,0.2)]'
            : 'border-white/10 hover:bg-white/8 hover:border-white/20'
        }`}
      >
        {/* Day Number - Premium Badge */}
        <div className="absolute -top-5 left-6 flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-teal to-neon-indigo rounded-full flex items-center justify-center font-display font-bold text-white text-lg shadow-lg border border-white/20">
            {dayNum}
          </div>
          <span className="text-xs uppercase tracking-widest text-white/50 font-semibold ml-1">{day}</span>
        </div>

        {/* Header with Stats */}
        <div className="mb-6 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {activities.length} {activities.length === 1 ? 'Activity' : 'Activities'}
            </h3>
            <div className="text-right">
              <p className="text-xs text-white/50">Day Total</p>
              <p className="text-lg font-mono font-bold text-neon-teal">
                ${Math.round(totalCost).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((activity, idx) => (
              <div key={activity.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <PremiumActivityCard
                  activity={activity}
                  onDelete={onDeleteActivity}
                />
              </div>
            ))
          ) : (
            <div className="h-32 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-white/40 mb-2">Drag activities here</p>
                <div className="text-4xl opacity-20">📍</div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Line */}
        <div className="mt-6 pt-6 border-t border-dashed border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-white/30 font-mono tracking-wider text-center">DROP ZONE ACTIVE</p>
        </div>
      </div>
    </div>
  );
}
